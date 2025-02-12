import type { IConfig } from './IConfigService';
export const defaultConfig: Partial<IConfig> = {
  headerbar: {
    display: true,
    options: {
      logo: {
        display: true,
        value: 'https://antv-2018.alipay.com/assets/image/icon/l7.svg',
        style: {
          height: '24px',
          width: '24px',
        },
      },
      title: {
        url: './',
        value: 'XX 管理系统',
        display: true,
      },
    },
    components: [],
  },
  toolbar: [
    {
      display: false,
      components: [],
    },
  ],
  mapType: 'GaodeV1',
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
  panel: {},
  controls: [
    {
      display: true,
      position: 'topleft',
      type: 'mapStyle',
    },
    {
      display: true,
      position: 'bottomright',
      type: 'location',
    },
    {
      type: 'zoom',
      position: 'bottomright',
      display: true,
    },
    {
      type: 'scale',
      position: 'bottomleft',
      display: true,
    },
  ],
  popup: {
    enable: false,
  },
  layers: [],
  legends: [],
};
