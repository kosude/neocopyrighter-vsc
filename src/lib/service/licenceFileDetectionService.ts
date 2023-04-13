/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

/**
 * Service class for automatically detecting files that seem to include project licence information.
 */
export class LicenceFileDetectionService {
    /**
     * Find licence file in workspace (e.g. LICENCE.md) based on patterns. Undefined is returned if there is none, otherwise the name is returned.
     * If there are multiple files that match the pattern, the first one in the array is returned.
     */
    public static async findLicenceFile(): Promise<string | undefined> {
        let fileNames: string[] = [];
        let matchedUris: vscode.Uri[] = [];

        matchedUris = matchedUris.concat(await vscode.workspace.findFiles("**/{L,l}{I,i}{C,c}{E,e}{N,n}{C,c,S,s}{E,e}"));
        matchedUris = matchedUris.concat(await vscode.workspace.findFiles("**/{L,l}{I,i}{C,c}{E,e}{N,n}{C,c,S,s}{E,e}.md"));

        // convert list of matched uris to list of file names
        matchedUris.forEach((uri) => {
            let name = uri.path.split("/").pop();
            if (name !== undefined) {
                fileNames.push(name);
            }
        });

        if (fileNames.length <= 0) {
            return undefined;
        }

        return fileNames[0];
    }

}
