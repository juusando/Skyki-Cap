import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconDir = path.join(__dirname, '../assets/icons');
const iconFiles = fs.readdirSync(iconDir).filter(file => file.endsWith('.svg'));

const importStatements = iconFiles.map((file) => {
  const Name = path.basename(file, '.svg');
  return `import ${Name} from '../assets/icons/${file}?react';`;
});

const iconMap = iconFiles.map((file) => {
  const Name = path.basename(file, '.svg');
  return `  '${Name}': ${Name},`;
});

const output = `
import React from 'react';
import type { SVGProps } from 'react';

${importStatements.join('\n')}

const iconComponents: { [key: string]: React.FC<SVGProps<SVGSVGElement>> } = {
${iconMap.join('\n')}
};

interface SvgIcnProps extends SVGProps<SVGSVGElement> {
  Name: string;
}

const SvgIcn: React.FC<SvgIcnProps> = ({ Name, ...props }) => {
  const SelectedIcon = iconComponents[Name];
  if (!SelectedIcon) {
    return null;
  }

  return <SelectedIcon {...props} />;
};

export default SvgIcn;
`;

const outputFilePath = path.join(__dirname, './IconCompo.tsx');

(async () => {
  try {
    await writeFile(outputFilePath, output, 'utf-8');
    console.log(`File written to ${outputFilePath}`);
  } catch (err) {
    console.error('Error writing file:', err);
  }
})();
