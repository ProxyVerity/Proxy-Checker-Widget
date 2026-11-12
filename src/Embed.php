<?php

declare(strict_types=1);

namespace ProxyVerity\Widget;

/**
 * Builds the <script> tag for the hosted ProxyVerity proxy checker widget.
 *
 * This package contains no checking logic and no copy of the loader. It
 * renders the same tag you would paste by hand and lets the hosted loader at
 * api.proxyverity.com do the rest, so a change on our side reaches you
 * without a release on yours.
 *
 * @see https://proxyverity.com/proxy-checker-widget/
 */
final class Embed
{
    /** URL of the hosted loader. */
    public const SRC = 'https://api.proxyverity.com/widget/embed.js';

    /**
     * Option name => data attribute. Anything not listed here is ignored, so
     * a typo cannot silently become an attribute the loader does not know.
     *
     * The credit's anchor text and destination are deliberately absent: they
     * are fixed in the loader and are not configurable here or anywhere else.
     *
     * @var array<string, string>
     */
    private const ATTRIBUTES = [
        'width'        => 'data-width',
        'height'       => 'data-height',
        'theme'        => 'data-theme',
        'accent'       => 'data-accent',
        'bg'           => 'data-bg',
        'fg'           => 'data-fg',
        'border'       => 'data-border',
        'radius'       => 'data-radius',
        'font'         => 'data-font',
        'threshold'    => 'data-threshold',
        'chunkSize'    => 'data-chunk-size',
        'openResults'  => 'data-open-results',
        'credit'       => 'data-credit',
        'creditAlign'  => 'data-credit-align',
    ];

    /**
     * Render the script tag.
     *
     * Values are passed through untouched apart from HTML escaping. They are
     * validated server-side, where an invalid one falls back to the theme's
     * default without an error; checking them again here would mean two sets
     * of rules that can disagree.
     *
     * @param array<string, scalar|null> $options
     */
    public static function tag(array $options = []): string
    {
        $attributes = '';

        foreach (self::ATTRIBUTES as $key => $attribute) {
            $value = $options[$key] ?? null;

            if ($value === null || $value === '') {
                continue;
            }

            $escaped = htmlspecialchars(
                (string) $value,
                ENT_QUOTES | ENT_SUBSTITUTE,
                'UTF-8'
            );

            $attributes .= sprintf("\n        %s=\"%s\"", $attribute, $escaped);
        }

        return sprintf(
            '<script src="%s"%s        async%s></script>',
            self::SRC,
            "\n",
            $attributes
        );
    }

    /**
     * Echo the script tag. Convenience for templates.
     *
     * @param array<string, scalar|null> $options
     */
    public static function render(array $options = []): void
    {
        echo self::tag($options);
    }
}
