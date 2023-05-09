/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import * as lib from '../lib/_index';

/**
 * Get user/workspace VS Code configuration
 */
function getConfiguration() {
    return vscode.workspace.getConfiguration();
}

/**
 * Get the user-supplied list of copyright holders and (optionally) dates
 */
export function getCopyrightHolders(): lib.CopyrightHolder[] {
    const names = getConfiguration().get<string[]>("neocopyrighter.author.copyrightHolderNames")!;
    const dates = getConfiguration().get<string[]>("neocopyrighter.author.copyrightHolderYears")!;

    // map the separate string arrays into a single holders array
    let holderObjects: lib.CopyrightHolder[] = [];
    for (let i = 0; i < names.length; i++) {
        holderObjects.push({
            name: names[i],
            date: ((dates[i] !== "") ? dates[i] : undefined)
        });
    }

    return holderObjects;
}

/**
 * Get user-specified licence display name
 *
 * @returns string
 */
export function getCustomLicenceDisplayName(): string {
    return getConfiguration().get<string>("neocopyrighter.licence.customLicenceDisplayName")!;
}

/**
 * Get user-specified licence body text
 *
 * @returns string
 */
export function getCustomLicenceBodyText(): string {
    return getConfiguration().get<string>("neocopyrighter.licence.customLicenceBody")!;
}

/**
 * Get user-specified licence type
 *
 * @returns Undefined if the user-specified licence id was invalid
 */
export function getUserLicence(): lib.Licence {
    // drop-down list should never be undefined in practice, and will only contain valid ids!
    const licenceStr = getConfiguration().get<string>("neocopyrighter.licence.identifier")!;

    if (licenceStr == "use custom") {
        return lib.LicenceFactory.custom(getCustomLicenceDisplayName(), getCustomLicenceBodyText());
    }

    return lib.LicenceFactory.get(licenceStr)!;
}

/**
 * Get boolean considering whether or not the user has specified the full form of the licence to be included in copyright notices.
 */
export function getUserLicenceFullFormBoolean(): boolean {
    // it should be impossible for a VS Code boolean value to be undefined, so we rely on it being set (!)
    const isFullForm = getConfiguration().get<boolean>("neocopyrighter.licence.includeFullForm")!;

    return isFullForm;
}

/**
 * Get string holding the licence file to reference, or undefined if no licence file should be included in copyright notices.
 */
export async function getLicenceFileName(): Promise<string | undefined> {
    const isIncluded = getConfiguration().get<boolean>("neocopyrighter.licenceFile.includeLicenceFile")!;

    // return undefined if no licence file is to be included
    if (!isIncluded) {
        return undefined;
    }

    const automaticallyDetect = getConfiguration().get<boolean>("neocopyrighter.licenceFile.automaticallyDetectLicenceFile")!;
    const customFile = getConfiguration().get<string>("neocopyrighter.licenceFile.customLicenceFile")!;

    // customFile overrides automaticallyDetect
    if (customFile !== "") {
        return customFile;
    }

    if (automaticallyDetect) {
        // this may also be undefined if none can be found.
        return lib.LicenceFileDetectionService.findLicenceFile();
    }

    return undefined;
}

export function getArrOnNewLine(): boolean {
    return getConfiguration().get<boolean>("neocopyrighter.copyrightNoticeStyle.placeAllRightsReservedOnNewLine")!;
}

/**
 * Get the comment header style for a particular language type based on user preferences.
 *
 * @param commentStyleType Language type id, aligning with those in package.json `commentStyle.*` config definitions.
 */
export function getUserCommentStyle(commentStyleType: string | undefined): lib.CommentStyle | undefined {
    if (commentStyleType === undefined) {
        return undefined;
    }

    const head = getConfiguration().get<string>(`neocopyrighter.commentStyle.${commentStyleType}.headPrefix`);
    const body = getConfiguration().get<string>(`neocopyrighter.commentStyle.${commentStyleType}.bodyPrefix`);
    const tail = getConfiguration().get<string>(`neocopyrighter.commentStyle.${commentStyleType}.tailPrefix`);

    if (head === undefined || body === undefined || tail === undefined) {
        throw new Error("Invalid commentStyleType option!");
    }

    return {
        headPrefix: head,
        bodyPrefix: body,
        tailPrefix: tail
    };
}

/**
 * Return a boolean showing whether or not the user has decided to have copyright notices automatically inserted to opened files.
 */
export function getCopyrighterAutomationSetting(): boolean {
    return getConfiguration().get<boolean>("neocopyrighter.automation.automaticallyCopyrightFiles")!;
}

/**
 * Return true if the copyrighter automation service should be limited to new files only.
 */
export function getCopyrighterNewFilesAutomationOnly(): boolean {
    return getConfiguration().get<boolean>("neocopyrighter.automation.newFilesOnly")!;
}
