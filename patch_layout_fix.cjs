const fs = require('fs');

let file = 'src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the double brace
content = content.replace(
  "      }\n      }\n    };",
  "      }\n    };"
);

fs.writeFileSync(file, content);
