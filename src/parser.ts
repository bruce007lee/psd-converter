import Color from 'color';
import { Layer, Psd, writePsd, readPsd } from 'ag-psd';
import { loadImageData } from './utils';
import { Schema } from './types';

export type Options = {};

export default class Parser {
  private options;

  constructor(options?: Options) {
    this.options = options;
  }

  /**
   * 解析
   */
  async psd2Schema(buffer: Buffer): Promise<string> {
    const psd = readPsd(buffer, { skipLayerImageData: true, skipCompositeImageData: true, skipThumbnail: true });
    console.log('[psd]:', JSON.stringify(psd.children, null, 2));
    return '';
  }

  /**
   * 解析
   */
  async schema2Psd(schemaData: string | Schema): Promise<ArrayBuffer> {
    let schema: Schema;
    if (typeof schemaData === 'string') {
      schema = JSON.parse(schemaData) as Schema;
    } else {
      schema = schemaData;
    }

    // console.log('[input schema]:', schema);

    const layers = [] as Layer[];
    if (schema.children) {
      for (let i = 0, l = schema.children.length; i < l; i++) {
        const element = schema.children[i];
        if (element.type === 'image') {
          layers.push({
            name: element.name,
            left: element.x,
            top: element.y,
            opacity: element.opacity,
            imageData: element.imageData ? element.imageData : await loadImageData(element.src),
          });
        } else if (element.type === 'text') {
          const fillColor = element.fillColor ? Color(element.fillColor).object() : { r: 0, g: 0, b: 0 };
          let { x } = element;
          const fontSize = element.fontSize || 12;
          const align = element.align || 'left';
          const width = element.width || 0;
          let font = {};
          if (element.fontFamily) {
            font = {
              font: {
                name: element.fontFamily,
              },
            };
          }
          if (align === 'right') {
            x += width;
          } else if (align === 'center') {
            x += width / 2;
          }
          const angle = element.rotation || 0;
          const toRadians = (ag) => (ag * Math.PI) / 180;
          const radians = toRadians(angle);
          layers.push({
            name: element.name,
            opacity: element.opacity,
            text: {
              transform: [
                Math.cos(radians),
                Math.sin(radians),
                -Math.sin(radians),
                Math.cos(radians),
                x - fontSize * Math.sin(radians),
                element.y + fontSize + fontSize * Math.sin(radians),
              ],
              text: element.text,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              style: {
                fontSize,
                fillColor,
                ...font,
              },
              paragraphStyle: {
                justification: align as any,
              },
            },
          });
        }
      }
    }

    const psd: Psd = {
      width: schema.width,
      height: schema.height,
      children: layers,
    };

    // console.log('[output schema]:', psd);

    return writePsd(psd);
  }
}
