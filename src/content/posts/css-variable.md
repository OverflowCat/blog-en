---
title: A CSS variable, a change in spec, and a VS Code fix
pubDate: 2025-07-14
modDate: 2025-07-26
categories: ["CSS"]
# categories: ['Articles']
description: "My friend yzqzss showed me a piece of code found in a GitHub login page’s CSS file when he is working on his GSoC project Zeno: a CSS variable that starts with a digit..."
slug: css-variable
---

My friend [yzqzss](https://github.com/yzqzss) showed me a piece of code found in a [GitHub login page's CSS file](https://github.githubassets.com/assets/landing-pages-6fbc3e78c091.css) when he is working on his GSoC project [Zeno](https://github.com/InternetArchive/Zeno): a CSS variable that starts with a digit, like `--7-grid-columns-minus-last-gap{:css}`. I had no idea this was valid CSS, and it turned out VS Code couldn't highlight it correctly either.

![Current VS Code syntax highlighting fails to recognize it correctly](https://github.com/user-attachments/assets/170edbc5-bb83-485b-8111-3c9946fcaced)

After some digging, I found that according to the spec, an identifier (`<ident-token>`) cannot start with a number. However, for CSS custom properties (variables) that start with a double dash `--`, the name that follows *can* start with a digit.

![](https://github.com/user-attachments/assets/14bcdf20-05e6-4e36-a201-ae3268e8a237)

Digging through the annals of web standards, I found this syntax change was made in 2014. The W3C made a stealth change without a clear explanation:

> Change the definition of ident-like tokens to allow `"--"` to start an ident. As part of this, rearrange the ordering of the clauses in the `"-"` step of [consume a token](https://www.w3.org/TR/css-syntax-3/#consume-a-token) so that [`<CDC-token>`](https://www.w3.org/TR/css-syntax-3/#typedef-cdc-token)s are recognized as such instead of becoming a -- [`<ident-token>`](https://www.w3.org/TR/css-syntax-3/#typedef-ident-token).

The old formal language was as follows:

![](https://github.com/user-attachments/assets/f0be6962-888c-4d83-93b3-ab5cb9b9e7ed)

Then I set out to fix it. VS Code's grammars use `tmLanguage.json`, a format I'm familiar with from my post on "[Transforming the AST of Cangjie Programming Language](https://blog.xinshijiededa.men/harmony/cangjie/ast/)". The built-in grammars are maintained in a separate repository, [microsoft/vscode-css](https://github.com/microsoft/vscode-css). The format isn't JSON, but CSON from CoffeeScript. But that's fine; it seems to have some nice string syntax sugar that trims the whitespace between lines in a multi-line string, which is handy for breaking up regular expressions.

```coffee
  (?:[-a-zA-Z_]    | [^\\x00-\\x7F])     # First letter
  (?:[-a-zA-Z0-9_] | [^\\x00-\\x7F]      # Remainder of identifier
    |\\\\(?:[0-9a-fA-F]{1,6}|.)
  )*
````

I removed its "First letter" line and changed the `*` at the end to a `+`. This variable syntax appears in two places: in the definition and in its usage, the latter being directly inside `var()`.

Next was writing tests. The test simply checks if a specific token in a line is what we expect:

```js
it('tokenizes custom variables with a leading digit', function () {
  var tokens;
  tokens = testGrammar.tokenizeLine('.flex { grid-template-columns: var(--7-grid-columns-minus-last-gap) var(--4-grid-columns); }').tokens;
  assert.deepStrictEqual(tokens[10], { scopes: ['source.css', 'meta.property-list.css', 'meta.property-value.css', 'meta.function.variable.css', 'variable.argument.css'], value: '--7-grid-columns-minus-last-gap' });
  assert.deepStrictEqual(tokens[15], { scopes: ['source.css', 'meta.property-list.css', 'meta.property-value.css', 'meta.function.variable.css', 'variable.argument.css'], value: '--4-grid-columns' });
});
```

I submitted the [pull request](https://github.com/microsoft/vscode-css/pull/43) with an explanation, signed the CLA, and received great feedback:

> Thank you for the detailed description and fix!
>
> LGTM

Turns out, the two people who approved it only have read-only permissions. It still needs a *maintainer*'s approval, so it's currently stuck. Sigh, corporations.
