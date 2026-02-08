export const languageColors: Record<string, string> = {
    JavaScript: 'lang-javascript',
    TypeScript: 'lang-typescript',
    Python: 'lang-python',
    Java: 'lang-java',
    Rust: 'lang-rust',
    Go: 'lang-go',
    HTML: 'lang-html',
    CSS: 'lang-css',
    Swift: 'lang-swift',
    Kotlin: 'lang-kotlin',
    PHP: 'lang-php',
    'C++': 'lang-cpp',
    'C#': 'lang-csharp',
    C: 'lang-c',
    Ruby: 'lang-ruby',
    Shell: 'lang-shell',
    Vue: 'lang-vue',
    Dart: 'lang-dart',
    Scala: 'lang-scala',
    Elixir: 'lang-elixir',
};

export function getLanguageColor(language: string | null): string {
    if (!language) return 'lang-default';
    return languageColors[language] || 'lang-default';
}
