/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';
import { commands } from 'vscode';

import { addCopyrightNotice } from './lib/commands';

/**
 * Static extension activation set-up function
 *
 * @param context VS Code extension API context
 */
export function activate(context: vscode.ExtensionContext) {
	console.log("NeoCopyrighter enabled");

    // register command handles
	context.subscriptions.push(
        commands.registerCommand("neocopyrighter.add-copyright-notice", addCopyrightNotice),
    );
}
