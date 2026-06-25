The site uses a locally installed Angst font when available.

To bundle a licensed webfont, place Angst.woff2 in this folder and update
the @font-face declaration in src/styles.css to:

src: local("Angst"), url("/fonts/Angst.woff2") format("woff2");
