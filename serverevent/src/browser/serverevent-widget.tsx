import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { TestServer } from '../common/test-protocol';
import { Event, Emitter } from "@theia/core";

@injectable()
export class ServereventWidget extends ReactWidget {

    static readonly ID = 'serverevent:widget';
    static readonly LABEL = 'Serverevent Widget';

    public readonly onChangedEmitter = new Emitter<void>();
    public readonly onFilesChanged: Event<void> = this.onChangedEmitter.event


    @inject(MessageService)
    protected readonly messageService!: MessageService;
    @inject(TestServer)
    protected readonly server: TestServer | any;

    @postConstruct()
    protected async init(): Promise < void> {

        this.id = ServereventWidget.ID;
        this.title.label = ServereventWidget.LABEL;
        this.title.caption = ServereventWidget.LABEL;
        this.title.closable = true;
        console.log('-----before setclient-----');

        


        
       
        console.log('-----after setclient-----');
        this.update();
    }

    public  onChange(): void {
        console.log('--------onchnage: frontend----------------');  
        this.messageService.info('Congratulations: Server event trigered Successfully !');      
        this.onChangedEmitter.fire();
    }

    protected render(): React.ReactNode {
        const header = `This is a sample widget which simply calls the messageService
        in order to display an info message to end users.`;
        return <div id='widget-container'>
            <h2>{ServereventWidget.LABEL}</h2>
            <AlertMessage type='INFO' header={header} />
            <button className='secondary' title='Display Message' onClick={_a => this.doAction()}>Display Message</button>
        </div>
    }

    protected doAction(): void {

        this.server.setClient({onChange:()=>this.onChange()});// not working

        this.server.performAction();
        
    }



}
