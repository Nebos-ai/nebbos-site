/* Idvor brand tokens for the Tailwind Play CDN */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink:   { DEFAULT:'#0B0B10', 900:'#0B0B10', 800:'#121219', 700:'#1A1A23', 600:'#24242F' },
        paper: '#F4F4F5',
        mist:  '#A6A6B2',
        faint: '#6A6A77',
        blue:  { DEFAULT:'#637DFF', deep:'#3B4ACB', soft:'#8FA1FF' },
        sky:   '#C9D3FF',
        tomato:'#F6926C',
      },
      fontFamily: {
        sans: ['"DM Sans"','system-ui','sans-serif'],
        mono: ['"DM Mono"','ui-monospace','monospace'],
      },
      letterSpacing: { tightest:'-.04em' },
      maxWidth: { content:'1160px' },
    }
  }
};
