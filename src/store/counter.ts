import { observable, action, runInAction } from 'mobx';
import request from 'src/utils/request';
import { delay } from 'src/utils';
import PagesCommonStore from './pages';

type WeatherType = {
  city: string;
  ganmao: string;
  wendu: string;
  yesterday: any;
  forecast: any[];
};

class CounterStore extends PagesCommonStore {
  @observable counter = 0;

  @action.bound
  increment() {
    this.counter++;
  }

  @action.bound
  decrement() {
    this.counter--;
  }

  @action.bound
  incrementAsync() {
    setTimeout(() => {
      runInAction(() => {
        this.counter++;
      });
    }, 1000);
  }

  @action.bound
  async getList() {
    try {
      const res = await this.pageInitRequest<[WeatherType, boolean]>(
        Promise.all([
          request.get(
            'http://wthrcdn.etouch.cn/weather_mini?citykey=101010100'
          ),
          delay(2000)
        ])
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

export default CounterStore;
