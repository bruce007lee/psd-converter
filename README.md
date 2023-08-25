# psd-converter

A simple utils for create psd on web

## Useage

```typescript
import Converter, { saveAs } from '@ice-fruits/psd-converter';

const schema = {
  width: 800,
  height: 1200,
  children: [
    {
      type: 'image',
      name: 'layer1',
      x: 30,
      y: 30,
      src: 'https://img.alicdn.com/imgextra/i2/471500007/O1CN017jboDr1BvFacfFmg1_!!0-saturn_solar.jpg_468x468q75.jpg',
    },
    {
      type: 'text',
      name: 'text1',
      x: 500,
      y: 30,
      text: 'Cool Girl！',
      fontSize: 40,
      fillColor: '#ff0000',
    },
    {
      type: 'image',
      name: 'layer2',
      x: 30,
      y: 510,
      src: 'https://img.alicdn.com/imgextra/i1/45086719/O1CN01tHGG2Y1zVLsDaFgo3_!!0-saturn_solar.jpg_468x468q75.jpg',
    },
    {
      type: 'text',
      name: 'text2',
      x: 500,
      y: 510,
      text: 'Fusion',
      fontSize: 40,
      fillColor: '#ff0000',
    },
  ],
};

const converter = new Converter();
const buffer = await converter.schema2Psd(schema);
saveAs(buffer, 'demo.psd');
```

## Demo

[Create PSD Sample](https://unpkg.com/@ice-fruits/psd-converter@1.0.0/build/index.html)

(You can change the `@1.0.0` in demo url to any version which you want)
