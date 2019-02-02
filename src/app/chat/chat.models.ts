// tslint:disable:max-line-length
import { ILanguageMap } from "@/plugins/translate";

export const LANGUAGES_MAP: ILanguageMap = {
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
  usersList: {
    vi: "Danh sách người dùng",
    en: "Users list"
  },
  noName: {
    vi: "(Chưa có tên)",
    en: "(No name)"
  },
  errorGettingUsersList: {
    vi: "Lỗi truy xuất Danh sách người dùng",
    en: "Error getting Users list"
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
  name: string;
  owner: string;
  participants: string[];
}

export interface IChatContent {
  _id?: string;
  senderId: string;
  message: string;
  timestamp: number;
  delivered: boolean;
}

export const parseChatDocName = (id1: string, id2: string) =>
  id1 > id2 ? `${id1}_${id2}` : `${id2}_${id1}`;

export function parseChatContent(id: string, data: any): IChatContent | null {
  if (
    data.senderId !== undefined &&
    data.timestamp !== undefined &&
    data.message !== undefined &&
    data.delivered !== undefined
  ) {
    return {
      _id: id,
      senderId: data.senderId,
      timestamp: data.timestamp,
      message: data.message,
      delivered: data.delivered
    };
  } else {
    return null;
  }
}
