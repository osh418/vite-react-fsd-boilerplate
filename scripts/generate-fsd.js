#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FSD 구조 정의
const FSD_STRUCTURE = {
  app: {
    segments: ['providers', 'router', 'store'],
    description: '앱 초기화, 라우터, 전역 설정'
  },
  pages: {
    segments: ['ui', 'model', 'api'],
    description: '페이지 컴포넌트'
  },
  widgets: {
    segments: ['ui', 'model', 'api'],
    description: '페이지 블록 (헤더, 사이드바 등)'
  },
  features: {
    segments: ['ui', 'model', 'api', 'hooks', 'store'],
    description: '비즈니스 로직이 있는 기능'
  },
  entities: {
    segments: ['ui', 'model', 'api', 'types'],
    description: '비즈니스 엔티티'
  },
  shared: {
    segments: ['ui', 'api', 'hooks', 'utils', 'constants', 'types'],
    description: '재사용 가능한 코드'
  }
};

// 디렉토리 생성 함수
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

// 파일 생성 함수
function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created file: ${filePath}`);
  }
}

// index.ts 파일 내용 생성
function generateIndexContent(layer, slice = null, segment = null) {
  if (segment) {
    // 세그먼트별 index.ts
    switch (segment) {
      case 'ui':
        return `// Export UI components\n`;
      case 'api':
        return `// Export API functions\n`;
      case 'model':
        return `// Export models and schemas\n`;
      case 'hooks':
        return `// Export custom hooks\n`;
      case 'store':
        return `// Export store and actions\n`;
      case 'types':
        return `// Export TypeScript types\n`;
      case 'utils':
        return `// Export utility functions\n`;
      case 'constants':
        return `// Export constants\n`;
      default:
        return `// Export ${segment} related code\n`;
    }
  } else if (slice) {
    // 슬라이스별 index.ts
    return `// Export all ${slice} related code\n`;
  } else {
    // 레이어별 index.ts
    return `// Export all ${layer} layer code\n`;
  }
}

// 전체 FSD 구조 생성
function generateFullStructure() {
  const srcPath = path.join(process.cwd(), 'src');
  
  console.log('🚀 Generating Feature-Sliced Design structure...\n');
  
  Object.entries(FSD_STRUCTURE).forEach(([layer, config]) => {
    const layerPath = path.join(srcPath, layer);
    createDirectory(layerPath);
    
    // 레이어별 index.ts 생성
    createFile(
      path.join(layerPath, 'index.ts'),
      generateIndexContent(layer)
    );
    
    console.log(`📁 ${layer}: ${config.description}`);
    
    // shared 레이어는 세그먼트만 생성
    if (layer === 'shared') {
      config.segments.forEach(segment => {
        const segmentPath = path.join(layerPath, segment);
        createDirectory(segmentPath);
        createFile(
          path.join(segmentPath, 'index.ts'),
          generateIndexContent(layer, null, segment)
        );
      });
    }
    
    console.log('');
  });
  
  // components 디렉토리는 그대로 유지 (shadcn/ui용)
  console.log('📁 components: shadcn/ui components (maintained)');
  
  console.log('✨ FSD structure generation completed!\n');
  console.log('📖 Next steps:');
  console.log('  - Use "npm run fsd:slice <layer> <slice-name>" to create slices');
  console.log('  - Use "npm run fsd:segment <layer> <slice> <segment>" to add segments');
  console.log('  - Follow FSD import rules: upper layers can only import from lower layers');
}

// 특정 슬라이스 생성
function generateSlice(layer, sliceName, segments = []) {
  const srcPath = path.join(process.cwd(), 'src');
  const layerPath = path.join(srcPath, layer);
  const slicePath = path.join(layerPath, sliceName);
  
  if (!FSD_STRUCTURE[layer]) {
    console.error(`❌ Invalid layer: ${layer}`);
    console.log(`Available layers: ${Object.keys(FSD_STRUCTURE).join(', ')}`);
    return;
  }
  
  console.log(`🚀 Generating ${layer}/${sliceName} slice...\n`);
  
  createDirectory(slicePath);
  createFile(
    path.join(slicePath, 'index.ts'),
    generateIndexContent(layer, sliceName)
  );
  
  // 세그먼트 생성
  const segmentsToCreate = segments.length > 0 ? segments : FSD_STRUCTURE[layer].segments;
  
  segmentsToCreate.forEach(segment => {
    const segmentPath = path.join(slicePath, segment);
    createDirectory(segmentPath);
    createFile(
      path.join(segmentPath, 'index.ts'),
      generateIndexContent(layer, sliceName, segment)
    );
  });
  
  console.log(`✨ Slice ${layer}/${sliceName} created successfully!`);
}

// 특정 세그먼트 생성
function generateSegment(layer, sliceName, segmentName) {
  const srcPath = path.join(process.cwd(), 'src');
  const segmentPath = path.join(srcPath, layer, sliceName, segmentName);
  
  if (!FSD_STRUCTURE[layer]) {
    console.error(`❌ Invalid layer: ${layer}`);
    return;
  }
  
  console.log(`🚀 Generating ${layer}/${sliceName}/${segmentName} segment...\n`);
  
  createDirectory(segmentPath);
  createFile(
    path.join(segmentPath, 'index.ts'),
    generateIndexContent(layer, sliceName, segmentName)
  );
  
  console.log(`✨ Segment ${layer}/${sliceName}/${segmentName} created successfully!`);
}

// CLI 처리
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'init':
      generateFullStructure();
      break;
      
    case 'slice':
      const [, layer, sliceName, ...segments] = args;
      if (!layer || !sliceName) {
        console.error('❌ Usage: npm run fsd:slice <layer> <slice-name> [segments...]');
        return;
      }
      generateSlice(layer, sliceName, segments);
      break;
      
    case 'segment':
      const [, segLayer, segSlice, segmentName] = args;
      if (!segLayer || !segSlice || !segmentName) {
        console.error('❌ Usage: npm run fsd:segment <layer> <slice> <segment>');
        return;
      }
      generateSegment(segLayer, segSlice, segmentName);
      break;
      
    case 'help':
    default:
      console.log(`
🏗️  Feature-Sliced Design Structure Generator

Commands:
  init                           Generate full FSD structure
  slice <layer> <name> [segs]    Generate a slice with optional segments
  segment <layer> <slice> <seg>  Generate a specific segment

Layers:
  app       - App initialization, router, global settings
  pages     - Page components  
  widgets   - Page blocks (header, sidebar, etc.)
  features  - Business logic features
  entities  - Business entities
  shared    - Reusable code

Examples:
  npm run fsd:init
  npm run fsd:slice features auth
  npm run fsd:slice features user-management ui api hooks
  npm run fsd:segment features auth store

FSD Rules:
  - Upper layers can only import from lower layers
  - Same layer imports are prohibited
  - shared layer can be imported everywhere
      `);
      break;
  }
}

main();
