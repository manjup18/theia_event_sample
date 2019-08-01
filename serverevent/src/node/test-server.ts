
import { injectable } from 'inversify';
import { TestServer,TestClient } from '../common/test-protocol';
//import { Emitter} from '@theia/core/lib/common';
/**
 * This class provides information on the device families and devices supported.
 */
@injectable()
export class TestServerImpl implements TestServer {

  client:TestClient | any;
  dispose(): void {
    throw new Error("Method not implemented.");
  }
  setClient(client:TestClient ): Promise<void> {
    console.log('----------setclient-------------');//function not getting called
    this.client = client;
    return Promise.resolve();
  }

  performAction(): Promise<void> {
    console.log('performAction: in server');
    this.client.onChange();//error:undefined client
   
    return Promise.resolve();
  }  
  
  
  

 

}