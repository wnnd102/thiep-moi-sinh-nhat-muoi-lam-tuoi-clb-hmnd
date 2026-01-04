
export type BlockType = 'text' | 'image' | 'video';

export interface PageBlock {
  id: string;
  type: BlockType;
  content: string;
  styles: {
    color?: string;
    fontSize?: string;
    fontWeight?: 'normal' | 'bold';
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline';
    textAlign?: 'left' | 'center' | 'right';
    fontFamily?: string;
    marginTop?: string;
    marginBottom?: string;
    width?: string;
    borderRadius?: string;
    lineHeight?: string;
    hasDashedBorder?: boolean;
    borderColor?: string;
    backgroundColor?: string;
  };
}

export interface PageData {
  blocks: PageBlock[];
  bgMusicUrl: string;
}

export enum MediaType {
  YOUTUBE = 'youtube',
  VIDEO = 'video',
  AUDIO = 'audio',
}

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  title: string;
  description?: string;
}
