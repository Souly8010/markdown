import React, { useState } from 'react';
import {marked} from 'marked';

const MarkdownViewer = () => {
  const [markdown, setMarkdown] = useState('');

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  // Gère l'insertion de texte dans le textarea à la position du curseur, 
  // facilitant l'ajout de syntaxe Markdown.
  const insertTextAtCursor = (text) => {
    const textarea = document.getElementById('markdown-textarea');
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const beforeValue = markdown.substring(0, startPos);
    const afterValue = markdown.substring(endPos, markdown.length);

    setMarkdown(beforeValue + text + afterValue);
    textarea.focus();
  };

  // Convertit le texte Markdown en HTML sécurisé pour l'afficher dans l'interface utilisateur.
  const getMarkdownText = () => {
    const rawMarkup = marked(markdown, { sanitize: true });
    return { __html: rawMarkup };
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="mb-4 space-x-2">
        <button 
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => insertTextAtCursor('# ')}
        >
          Heading 1
        </button>
        <button 
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => insertTextAtCursor('## ')}
        >
          Heading 2
        </button>
        <button 
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => insertTextAtCursor('**Bold**')}
        >
          Bold
        </button>
        <button 
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => insertTextAtCursor('_Italic_')}
        >
          Italic
        </button>
        <button 
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => insertTextAtCursor('---\n')}
        >
          Horizontal Line
        </button>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-2">Markdown Input</h2>
          <textarea
            id="markdown-textarea"
            className="w-full h-full p-4 border border-gray-300 rounded resize-none"
            value={markdown}
            onChange={handleMarkdownChange}
          />
        </div>
        <div className="flex-1 p-4 border-l border-gray-300">
          <h2 className="text-xl font-bold mb-2">HTML Output</h2>
          <div
            className="p-4 bg-gray-100 h-full overflow-auto rounded"
            dangerouslySetInnerHTML={getMarkdownText()}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownViewer;
