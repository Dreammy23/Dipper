import { injectable } from 'inversify';
import EventEmitter from 'eventemitter3';
import type { IConfigService, IConfig } from './IConfigService';
import { get, mergeWith } from 'lodash';
import { updateConfigsField } from '../../utils/';
import { defaultConfig } from './defaultConfig';

function customizer(obj: any, src: any) {
  if (Array.isArray(src)) {
    return src;
  }
}

export enum ConfigEventEnum {
  'CONFIG_CHANGE' = 'configchange',
  'GLOBAL_CHANGE' = 'globalchange',
}

@injectable()
export default class ConfigService
  extends EventEmitter
  implements IConfigService
{
  public config!: Partial<IConfig>;

  private isInited: boolean = false;
  init(config: Partial<IConfig> | undefined) {
    if (!this.isInited) {
      this.config = mergeWith({}, defaultConfig, config);
      this.emit(ConfigEventEnum.CONFIG_CHANGE, this.config);
    }
    this.isInited = true;
  }

  setConfig(field: string, value: any) {
    this.config = updateConfigsField(this.config, field, value);
    this.emit(ConfigEventEnum.CONFIG_CHANGE, this.config); // TODO 按需更新
  }

  updateLegend(id: string, value: any) {
    this.updateControlConfig('legends', id, value);
  }

  updateControl(type: string, value: any) {
    const index = this.config.controls?.findIndex((k) => k.type === type);
    if (index !== -1) {
      this.setConfig(`controls.${index}`, {
        ...this.getConfig(`controls.${index}`),
        ...value,
      });
    } else {
      // 组件未添加
      console.warn('组件未添加');
    }
  }
  // legends;
  updateControlConfig(type: keyof IConfig, id: string, value: any) {
    const index = this.config.legends?.findIndex((k) => k.id === id);
    if (index !== -1) {
      this.setConfig(`${type}.${index}`, value);
    } else {
      this.setConfig(`${type}.${0}`, {
        id,
        ...value,
      });
    }
  }

  getConfig(key: string) {
    return get(this.config, key, undefined);
  }

  // 设置组件结果值
  setWidgetsInitOptions(key: string, options: Record<string, any>) {
    this.setConfig(`widgets.${key}.options`, options);
  }

  // 设置组件结果值
  setWidgetsInitValue(key: string, value: Record<string, any>) {
    this.setConfig(`widgets.${key}.value`, value);
  }
  // 获取组件结果值
  getWidgetsInitValue(key: string) {
    return this.getConfig(`widgets.${key}.value`);
  }

  // 获取组件结果值
  getWidgetsInitOptions(key: string) {
    return this.getConfig(`widgets.${key}.options`);
  }
  reset() {
    this.isInited = false;
  }
  // 全局参数
  getGlobal() {
    return this.config?.global || {};
  }
  // 设置全局参数
  setGlobal(key: string, value: any) {
    this.setConfig(`global.${key}`, value);
  }
}
