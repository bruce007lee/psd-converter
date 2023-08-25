```jsx
import React, { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import Converter, { saveAs } from '../src/index';

const defaultSchema = {
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

let App = () => {
  const textRef = useRef();
  return (
    <div>
      <div>
        <textarea
          style={{ width: '800px', height: '300px' }}
          ref={textRef}
          defaultValue={JSON.stringify(defaultSchema, null, 2)}
        />
      </div>
      <div>
        <button
          onClick={async () => {
            const schema = textRef.current.value;
            const converter = new Converter();
            try {
              const buffer = await converter.schema2Psd(schema);
              saveAs(buffer, 'demo.psd');
            } catch (e) {
              alert(e.message);
              console.error(e);
            }
          }}
        >
          Save as PSD
        </button>
      </div>
    </div>
  );
};

export default App;
```
