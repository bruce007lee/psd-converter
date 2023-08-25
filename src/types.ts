export type BaseElement = {
  name: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  /**
   * 透明度
   */
  opacity?: number;
};

export type ImageElement = BaseElement & {
  type: 'image';
  /**
   * 图片url
   * 注意如果用url的图片，则图片必须支持cors访问
   */
  src?: string;
  /**
   * 图片imageData数据，如果同时设置了src和imageData, imageData的数据优先
   */
  imageData?: ImageData;
};

export type TextElement = BaseElement & {
  type: 'text';
  /**
   * 文本内容
   */
  text: string;
  /**
   * 字体大小，默认12px
   */
  fontSize?: number;
  /**
   * 字体
   * 注意如果字体在ps中没有，则文字不会显示
   */
  fontFamily?: string;
  /**
   * 字体对齐方式，注意只有设置了width此属性才有效
   */
  align?: 'left' | 'right' | 'center';
  /**
   * 文字填充色
   */
  fillColor?: string;
  /**
   * 旋转角度
   */
  rotation?: number;
};

export type Schema = {
  /**
   * canvas width
   */
  width: number;
  /**
   * canvas height
   */
  height: number;
  /**
   * layer children
   */
  children?: Array<ImageElement | TextElement>;
};
