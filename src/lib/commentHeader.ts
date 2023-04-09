/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

/**
 * Interface holding configuration for generating a comment header
 */
export interface CommentHeaderConfig {
}

/**
 * A class to represent a comment header (i.e. a multi-line comment to be put at the top of a source file)
 */
export class CommentHeader {
    /** Comment header configuration */
    public get config() { return this._config; }
    private _config: CommentHeaderConfig;

    /** Overall comment string (including comment delimiters, e.g. forward slashes) */
    public get text() { return this._text; }
    private _text: string;

    /**
     * Dynamically generate a comment header based on parameters
     *
     * @param config Comment header configuration
     * @param innerText Text to show in the comment block
     */
    public constructor(config: CommentHeaderConfig, innerText: string) {
        this._config = config;
        this._text = this._generateCommentBlock(innerText);
    }

    /**
     * Given contents `innerText`, produce (and return) a multi-line comment block including them.
     *
     * @param innerText Comment header block contents
     * @returns String containing comment block
     */
    private _generateCommentBlock(innerText: string): string {
        // using regex allows us to easily handle CR, LF, and CRLF endings.
        const lines: string[] = innerText.split(/\r\n|\r|\n/);

        let commentBlock = "";

        commentBlock += "/*\n";

        lines.forEach(line => {
            commentBlock += ` * ${line}\n`;
        });

        commentBlock += " */";

        return commentBlock;
    }
}
