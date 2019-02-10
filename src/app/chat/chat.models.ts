// tslint:disable:max-line-length
import { ILanguageMap, USERS_COLLECTION, IProfile } from "@/store/root.models";

export const CHAT_ROUTE = "/chat";
export const CHAT_ROOM_ROUTE = "room/:id";
export const CHAT_USER_ROUTE = "user/:id";

export const CHAT_LANGUAGES: ILanguageMap = {
  // Chat
  clickChatRoomIcon: {
    vi:
      "Tham gia phòng chat hoặc gởi tin nhắn trực tiếp bằng cách nhấn nút tham gia bên dưới",
    en: "Join chat room or send direct message by click the join button below"
  },
  noProfileFound: {
    vi: "Không tìm thấy thông tin tài khoản",
    en: "No profile information found"
  },
  // End of Chat
  // ChatEditProfile
  editProfile: {
    vi: "Thay đổi thông tin tài khoản",
    en: "Edit profile information"
  },
  displayName: {
    vi: "Tên gọi",
    en: "Display Name"
  },
  invalidDisplayName: {
    vi: "Tên gọi phải nhiều hơn 3 ký tự",
    en: "Display Name must longer than 3 characters"
  },
  change: {
    vi: "Thay đổi",
    en: "Change"
  },
  update: {
    vi: "Cập nhật",
    en: "Update"
  },
  updatingProfile: {
    vi: "Đang cập nhật thông tin tài khoản",
    en: "Updating profile information"
  },
  unableUpdateProfile: {
    vi: "Không thể cập nhật thông tin tài khoản",
    en: "Unable to update profile information"
  },
  // End of ChatEditProfile
  // ChatCreateRoom
  createChatRoom: {
    vi: "Tạo phòng chat",
    en: "Create chat room"
  },
  chatRoomName: {
    vi: "Tên phòng chat",
    en: "Chat room name"
  },
  create: {
    vi: "Tạo",
    en: "Create"
  },
  creatingChatRoom: {
    vi: "Đang tạo phòng chat...",
    en: "Creating chat room..."
  },
  unableCreateChatRoom: {
    vi: "Không tạo được phòng chat",
    en: "Unable to create chat room"
  },
  cancel: {
    vi: "Huỷ bỏ",
    en: "Cancel"
  },
  roomNameMustLongerThanThree: {
    vi: "Tên phòng phải có nhiều hơn 3 ký tự",
    en: "Room name must be longer than 3 characters"
  },
  // End of ChatCreateRoom
  // ChatRoomDrawer
  chatRooms: {
    vi: "Phòng chat",
    en: "Chat rooms"
  },
  participants: {
    vi: "Thành viên",
    en: "Participants"
  },
  owner: {
    vi: "Chủ phòng",
    en: "Owner"
  },
  contactsList: {
    vi: "Danh bạ",
    en: "Contacts list"
  },
  noName: {
    vi: "(Chưa có tên)",
    en: "(No name)"
  },
  joined: {
    vi: "Tham gia",
    en: "Joined"
  },
  // End of ChatRoomDrawer
  // ChatAddContact
  addContact: {
    vi: "Thêm tài khoản",
    en: "Add contact"
  },
  invalidEmail: {
    vi: "Email không hợp lệ",
    en: "Invalid email"
  },
  contactAlreadyAdded: {
    vi: "Tài khoản đã có trong danh bạ",
    en: "This account is already in your contact"
  },
  notFoundUser: {
    vi: "Không tìm thấy tài khoản",
    en: "User account cannot be found"
  },
  // End of ChatAddContact
  // ChatUser
  loadingChat: {
    vi: "Đang tải tin...",
    en: "Loading chat..."
  },
  errorReadingChatContent: {
    vi: "Lỗi khi đọc nội dung chat",
    en: "Error reading chat content"
  },
  unableUpdateDeliveredStatus: {
    vi: "Không cập nhật được trạng thái đọc tin nhắn",
    en: "Unable to update message delivered status"
  },
  noMessage: {
    vi: "Chưa có chat",
    en: "No message"
  },
  noReceiverFound: {
    vi: "Không có user với id: ",
    en: "No user found with id: "
  },
  // End of ChatUser
  // ChatInput
  inputMessage: {
    vi: "Nhập tin nhắn để gởi",
    en: "Enter message"
  },
  unableSendMessage: {
    vi: "Không gởi được tin nhắn",
    en: "Unable to send message"
  }
  // End of ChatInput
};

export const DEFAULT_PROFILE_IMAGE: string = "stanlee.jpg";

export const PROFILE_IMAGES_LIST: string[] = [
  "laracroft.jpg",
  "batman.jpg",
  "deadpool.jpeg",
  "doctorstrange.jpg",
  "drmanhattan.jpeg",
  "johnwick.jpg",
  "riddick.jpg",
  "thanos.jpg",
  "thor.jpg",
  "wolverine.jpeg",
  "wonderwoman.jpeg",
  "aquaman.jpg",
  "sherlockholmes.jpg",
  "kratos.jpg",
  "khaleesi.jpg",
  "kusanagi.jpg",
  "ryogi.jpg"
];

export const CHATROOMS_COLLECTION = "chatrooms";
export const CHATS_COLLECTION = "chats";

export interface IChatRoom {
  id: string;
  participants: IProfile[];
  timestamp: number;
}

export interface IChatContent {
  id?: string;
  senderId: string;
  message: string;
  timestamp: number;
  delivered: boolean;
}

export const parseChatRoom = async (
  userId: string,
  doc: firebase.firestore.QueryDocumentSnapshot,
  firebaseApp: firebase.app.App,
  profileParser: (id: string, data: any) => IProfile
): Promise<IChatRoom> => {
  const participants = doc.data().participants as string[];
  const promises = participants.filter((id) => id !== userId).map((id) =>
    firebaseApp
      .firestore()
      .collection(USERS_COLLECTION)
      .doc(id)
      .get()
  );
  const results = await Promise.all(promises);
  const chatRoomParticipants = results.map((snap) =>
    profileParser(snap.id, snap.data())
  );
  return {
    id: doc.id,
    participants: chatRoomParticipants,
    timestamp: doc.data().timestamp
  };
};

export const parseChatDocName = (id1: string, id2: string): string =>
  id1 > id2 ? `${id1}_${id2}` : `${id2}_${id1}`;

export const parseChatContent = (id: string, data: any): IChatContent => ({
  id,
  senderId: data.senderId,
  timestamp: data.timestamp,
  message: data.message,
  delivered: data.delivered
});
