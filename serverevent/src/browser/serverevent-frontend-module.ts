import { ContainerModule } from 'inversify';
import { ServereventWidget } from './serverevent-widget';
import { ServereventContribution } from './serverevent-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory, WebSocketConnectionProvider } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';
import { TestServer, testPath } from '../common/test-protocol';


export default new ContainerModule(bind => {

    bind(TestServer).toDynamicValue(ctx => {
        const provider = ctx.container.get(WebSocketConnectionProvider);
        return provider.createProxy<TestServer>(testPath);
    }).inSingletonScope();  


    bindViewContribution(bind, ServereventContribution);
    bind(FrontendApplicationContribution).toService(ServereventContribution);
    bind(ServereventWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: ServereventWidget.ID,
        createWidget: () => ctx.container.get<ServereventWidget>(ServereventWidget)
    })).inSingletonScope();



});
