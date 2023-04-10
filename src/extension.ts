/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import * as com from './commands';

/**
 * Static extension activation set-up function
 *
 * @param context VS Code extension API context
 */
export function activate(context: vscode.ExtensionContext) {
    // register command handles
    context.subscriptions.push(
        vscode.commands.registerCommand("neocopyrighter.add-copyright-notice", com.addCopyrightNotice),
    );
}
