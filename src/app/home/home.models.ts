// tslint:disable:max-line-length
import { ILanguageMap } from "@/store/root.models";

export const HOME_ROUTE = "/";

export const HOME_LANGUAGES: ILanguageMap = {
  greeting: {
    vi: "Lời chào",
    en: "Greeting"
  },
  hello: {
    vi: "Xin chào, tên tôi là",
    en: "Hi, My name is"
  },
  name: {
    vi: "Trần Quang (tên khác Chop Tr)",
    en: "Quang Tran (aka Chop Tr)"
  },
  greetingText: {
    vi:
      "Lập trình đối với tôi là một sở thích từ nhỏ nhưng dần dần đã trở thành một niềm đam mê mạnh mẽ. \
      Tính tôi thích logic và quy cách, cấu trúc, tôi có thể thỏa thích trải nghiệm và tìm tòi những thứ mới mỗi khi đắm mình vào những dòng mã nguồn. \
      Và trang web này phục vụ như là demo những kỹ năng của tôi học được và là sân chơi cho những thứ tôi đang tìm tòi.",
    en:
      "At first, Software Engineer is a hobby of mine but eventually it became my passion. \
      I can satisfy the need for structure design and to thrive for new thing everytime I begin to flow in the code. \
      This website serves as a demonstration of my coding blog. And also a playground for things I am learning."
  },
  skillLevel: {
    vi: "Trình độ",
    en: "Skill level"
  },
  fieldsOfInterest: {
    vi: "Lĩnh vực đang quan tâm",
    en: "Fields of interest"
  }
};

export const SKILLS = [
  {
    title: "Vue",
    route: "/playground/vue",
    level: 5,
    interests: [
      {
        name: "Nuxt - Universal Application",
        link: "https://nuxtjs.org/"
      },
      {
        name: "Vue Typescript",
        link: "https://vuejs.org/v2/guide/typescript.html"
      }
    ]
  },
  {
    title: "Firebase",
    route: "/playground/firebase",
    level: 5,
    interests: [
      {
        name: "Firebase ML Kit",
        link: "https://firebase.google.com/products/ml-kit/"
      }
    ]
  },
  {
    title: "Angular 6",
    route: "/playground/angular",
    level: 5,
    interests: [{ name: "Nrwl's Nx", link: "https://nrwl.io/nx" }]
  },
  {
    title: "React",
    route: "/playground/react",
    level: 4,
    interests: [
      {
        name: "React's Hooks",
        link: "https://reactjs.org/docs/hooks-intro.html"
      }
    ]
  },
  {
    title: "Machine Learning",
    route: "/playground/machine",
    level: 2,
    interests: [
      {
        name: "Tensorflow",
        link: "https://www.tensorflow.org"
      }
    ]
  },
  {
    title: "Python",
    route: "/playground/python",
    level: 2,
    interests: []
  }
];
