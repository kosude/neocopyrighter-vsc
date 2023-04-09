/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';
import { commands } from 'vscode';

import * as lib from './lib/_index';

/**
 * Static extension activation set-up function
 *
 * @param context VS Code extension API context
 */
export function activate(context: vscode.ExtensionContext) {
	console.log("NeoCopyrighter enabled");
    vscode.window.showInformationMessage("hi");

    // register command handles
	context.subscriptions.push(
        commands.registerCommand("neocopyrighter.add-copyright-notice", () => {}),
    );

    console.log(new lib.CommentHeader(
        {},
        new lib.CopyrightNotice({
            authorName: "Jack Bennett",
            licence: lib.MIT_LICENCE
        }).text
    ).text);
}
