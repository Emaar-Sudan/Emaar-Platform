export interface News {
  id: string;
  type: string;
  image: string;
  titleNews: string;
  descriptionNews: string;
  Date: string;
}

export interface Advertisement {
  id: string;
  image: string;
  name: string;
  title: string;
  content: string;
  description: string;
  serviceLink: string;
  discount?: string;
  contactInfo: string;
}