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
 * Binding for `neocopyrighter.add-copyright-notice-<licence id>`
 * This function adds a copyright notice for a specific licence regardless of user or workspace settings.
 */
export async function addCopyrightNoticeWithLicence(id?: string) {
    if (vscode.window.activeTextEditor !== undefined) {
        await lib.CopyrighterService.insertCopyright(conf, vscode.window.activeTextEditor, id);
    }
}

/**
 * Binding for `neocopyrighter.add-copyright-notice`
 */
export async function addCopyrightNotice() {
    await addCopyrightNoticeWithLicence();
}
