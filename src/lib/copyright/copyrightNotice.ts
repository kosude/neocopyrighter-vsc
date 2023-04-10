/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import { Licence } from "./licence";

/**
 * Interface containing data necessary to generate a copyright notice class.
 */
export interface CopyrightNoticeData {
    /** String of author name */
    authorName: string;
    /** Licence information */
    licence: Licence;
}

/**
 * A class representing a copyright notice.
 */
export class CopyrightNotice {
    /** Copyright notice data */
    public get data() { return this._data; }
    private _data: CopyrightNoticeData;

    /** String to be presented as the copyright notice */
    public get text() { return this._text; }
    private _text: string;

    /**
     * Generate a copyright notice class from the given data
     *
     * @param data Data to be presented as part of the notice text
     */
    public constructor(data: CopyrightNoticeData) {
        this._data = data;
        this._text = this._generateText();
    }

    /**
     * Helper function to produce the text from the data for the notice
     *
     * @param data Data to be presented as part of the notice text
     */
    private _generateText(): string {
        return `Copyright (c) 20XX ${this._data.authorName} - All rights reserved.

${this._data.licence.body}`;
    }
}
