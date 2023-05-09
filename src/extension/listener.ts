/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import * as lib from '../lib/_index';
import * as conf from './userConfig';

/**
 * Insert copyright notice to file by editor
 */
export async function insertCopyrightToEditor(editor: vscode.TextEditor) {
    // config automation disabled
    if (!conf.getCopyrighterAutomationSetting()) {
        return;
    }

    // not new file and non-new file automation disabled
if (conf.getCopyrighterNewFilesAutomationOnly() && editor.document.lineCount > 1) {
        return;
    }

    await lib.CopyrighterService.insertCopyright(conf, editor);
}
