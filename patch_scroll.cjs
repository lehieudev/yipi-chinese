const fs = require('fs');
let file = 'src/components/SideNavigation.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /const element = document\.getElementById\(section\.id\);\n\s*if \(element\) \{\n\s*const \{ offsetTop \} = element;/g,
  `const element = document.getElementById(section.id);\n        if (element) {\n          const offsetTop = element.getBoundingClientRect().top + window.scrollY;`
);

content = content.replace(
  /const element = document\.getElementById\(id\);\n\s*if \(element\) \{\n\s*window\.scrollTo\(\{\n\s*top: element\.offsetTop,/g,
  `const element = document.getElementById(id);\n    if (element) {\n      window.scrollTo({\n        top: element.getBoundingClientRect().top + window.scrollY,`
);

fs.writeFileSync(file, content);
