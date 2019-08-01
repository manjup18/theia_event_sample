/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { ContainerModule } from 'inversify';
// import { ConnectionHandler, JsonRpcConnectionHandler } from '../common';

import { TestServer, testPath} from '../common/test-protocol';

import { TestServerImpl } from './test-server';
import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core';
// import { OutputChannelManager } from '@theia/output/lib/common/output-channel';


export default new ContainerModule(bind => {

   
   
    bind(TestServerImpl).toSelf().inSingletonScope();
    bind(TestServer).toService(TestServerImpl);
    

    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler(testPath, () =>
            ctx.container.get(TestServer)
        )
    ).inSingletonScope();


   

    
});
