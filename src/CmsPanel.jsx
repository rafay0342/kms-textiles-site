import { useMemo, useState } from 'react';
import { ArrowLeft, Copy, FileDown, ImagePlus, Plus, RotateCcw, Save, Trash2, X } from 'lucide-react';

const SECTION_LABELS = {
  nav: 'Navigation',
  contact: 'Contact',
  hero: 'Hero',
  metrics: 'Metrics',
  why: 'Why Us',
  promos: 'Promo Blocks',
  about: 'About',
  facilities: 'Facilities',
  products: 'Products',
  fabric: 'Fabrics',
  cta: 'Main CTA',
  foundation: 'Foundation',
  footer: 'Footer',
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function prettyKey(key) {
  return String(key)
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();
}

function isImageField(path) {
  const key = String(path[path.length - 1] || '').toLowerCase();
  return key === 'image' || key === 'src' || key.endsWith('image');
}

function isLongText(value, key) {
  return String(value).length > 64 || ['text', 'quote', 'paragraphs', 'body'].includes(String(key).toLowerCase());
}

function blankFrom(sample) {
  if (Array.isArray(sample)) return sample.length ? sample.map((item) => blankFrom(item)) : [''];
  if (sample && typeof sample === 'object') {
    return Object.fromEntries(Object.entries(sample).map(([key, value]) => [key, blankFrom(value)]));
  }
  if (typeof sample === 'number') return 0;
  if (typeof sample === 'boolean') return false;
  return '';
}

function setIn(source, path, value) {
  const next = clone(source);
  let cursor = next;
  path.slice(0, -1).forEach((part) => {
    cursor = cursor[part];
  });
  cursor[path[path.length - 1]] = value;
  return next;
}

function removeIn(source, path) {
  const next = clone(source);
  let cursor = next;
  path.slice(0, -1).forEach((part) => {
    cursor = cursor[part];
  });
  cursor.splice(path[path.length - 1], 1);
  return next;
}

function insertIn(source, path, value) {
  const next = clone(source);
  let cursor = next;
  path.forEach((part) => {
    cursor = cursor[part];
  });
  cursor.push(value);
  return next;
}

function duplicateIn(source, path) {
  const next = clone(source);
  let cursor = next;
  path.slice(0, -1).forEach((part) => {
    cursor = cursor[part];
  });
  const index = path[path.length - 1];
  cursor.splice(index + 1, 0, clone(cursor[index]));
  return next;
}

function FieldEditor({ fieldKey, value, path, onSet, onRemove, onDuplicate, canRemove }) {
  const label = Array.isArray(path) && typeof fieldKey === 'number' ? `Item ${fieldKey + 1}` : prettyKey(fieldKey);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onSet(path, String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  if (Array.isArray(value)) {
    const sample = value[0] ?? '';

    return (
      <div className="cms-array">
        <div className="cms-array-head">
          <h4>{label}</h4>
        </div>
        <div className="cms-array-items">
          {value.map((item, index) => (
            <div className="cms-array-item" key={`${path.join('.')}-${index}`}>
              <div className="cms-array-item-head">
                <span>{`${label} ${index + 1}`}</span>
                <div>
                  <button type="button" onClick={() => onDuplicate([...path, index])} aria-label="Duplicate item">
                    <Copy size={15} />
                  </button>
                  <button type="button" onClick={() => onRemove([...path, index])} aria-label="Remove item">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <FieldEditor fieldKey={index} value={item} path={[...path, index]} onSet={onSet} onRemove={onRemove} onDuplicate={onDuplicate} />
            </div>
          ))}
        </div>
        <button className="cms-add-button" type="button" onClick={() => onSet(path, [...value, blankFrom(sample)])}>
          <Plus size={16} />
          Add {label}
        </button>
      </div>
    );
  }

  if (value && typeof value === 'object') {
    return (
      <div className="cms-object">
        {canRemove && (
          <div className="cms-object-tools">
            <button type="button" onClick={() => onDuplicate(path)} aria-label="Duplicate block">
              <Copy size={15} />
            </button>
            <button type="button" onClick={() => onRemove(path)} aria-label="Remove block">
              <Trash2 size={15} />
            </button>
          </div>
        )}
        {Object.entries(value).map(([key, item]) => (
          <FieldEditor
            key={[...path, key].join('.')}
            fieldKey={key}
            value={item}
            path={[...path, key]}
            onSet={onSet}
            onRemove={onRemove}
            onDuplicate={onDuplicate}
          />
        ))}
      </div>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <label className="cms-field cms-check">
        <span>{label}</span>
        <input type="checkbox" checked={value} onChange={(event) => onSet(path, event.target.checked)} />
      </label>
    );
  }

  if (typeof value === 'number') {
    return (
      <label className="cms-field">
        <span>{label}</span>
        <input type="number" value={value} onChange={(event) => onSet(path, Number(event.target.value))} />
      </label>
    );
  }

  const stringValue = value ?? '';

  return (
    <label className={`cms-field ${isImageField(path) ? 'is-image-field' : ''}`}>
      <span>{label}</span>
      {isLongText(stringValue, fieldKey) ? (
        <textarea value={stringValue} onChange={(event) => onSet(path, event.target.value)} rows={4} />
      ) : (
        <input value={stringValue} onChange={(event) => onSet(path, event.target.value)} />
      )}
      {isImageField(path) && (
        <div className="cms-image-tools">
          {stringValue && <img src={stringValue} alt="" />}
          <span>
            <ImagePlus size={15} />
            Upload local image
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </span>
        </div>
      )}
    </label>
  );
}

export function CmsPanel({ content, defaults, onChange, onClose }) {
  const sections = useMemo(() => Object.keys(content), [content]);
  const [activeSection, setActiveSection] = useState(sections[0] || 'hero');
  const [jsonText, setJsonText] = useState('');
  const [message, setMessage] = useState('Auto-saved locally');

  const setValue = (path, value) => {
    if (path.length === 0) {
      onChange(value);
      return;
    }
    onChange((current) => setIn(current, path, value));
    setMessage('Saved locally');
  };

  const removeValue = (path) => {
    onChange((current) => removeIn(current, path));
    setMessage('Removed and saved');
  };

  const duplicateValue = (path) => {
    onChange((current) => duplicateIn(current, path));
    setMessage('Duplicated and saved');
  };

  const resetAll = () => {
    onChange(clone(defaults));
    setMessage('Reset to original content');
  };

  const exportJson = () => {
    setJsonText(JSON.stringify(content, null, 2));
    setMessage('JSON exported below');
  };

  const importJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onChange(parsed);
      setMessage('Imported and saved locally');
    } catch {
      setMessage('JSON is not valid');
    }
  };

  return (
    <section className="cms-panel" aria-label="KMS local CMS">
      <header className="cms-topbar">
        <div>
          <p>KMS Local CMS</p>
          <h2>Manage Website Content</h2>
        </div>
        <div className="cms-actions">
          <span>{message}</span>
          <button type="button" onClick={exportJson}>
            <FileDown size={16} />
            Export
          </button>
          <button type="button" onClick={resetAll}>
            <RotateCcw size={16} />
            Reset
          </button>
          <button type="button" onClick={onClose}>
            <X size={17} />
            Close
          </button>
        </div>
      </header>

      <div className="cms-layout">
        <aside className="cms-sidebar">
          <a href="#home" onClick={onClose}>
            <ArrowLeft size={16} />
            Preview Site
          </a>
          {sections.map((section) => (
            <button
              className={activeSection === section ? 'is-active' : ''}
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
            >
              {SECTION_LABELS[section] || prettyKey(section)}
            </button>
          ))}
        </aside>

        <div className="cms-editor">
          <div className="cms-section-title">
            <p>Editing</p>
            <h3>{SECTION_LABELS[activeSection] || prettyKey(activeSection)}</h3>
          </div>
          <FieldEditor
            fieldKey={activeSection}
            value={content[activeSection]}
            path={[activeSection]}
            onSet={setValue}
            onRemove={removeValue}
            onDuplicate={duplicateValue}
          />

          <div className="cms-json-box">
            <div>
              <h4>Backup / Restore JSON</h4>
              <p>Use this for full CMS backup or bulk edits.</p>
            </div>
            <textarea value={jsonText} onChange={(event) => setJsonText(event.target.value)} rows={8} />
            <button type="button" onClick={importJson}>
              <Save size={16} />
              Import JSON
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
