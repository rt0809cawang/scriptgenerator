import React, { useState } from 'react';
import { Copy, RefreshCw, Download, Upload, X } from 'lucide-react';
import './App.css';

function App() {
  const [subject, setSubject] = useState('');
  const [action, setAction] = useState('');
  const [environment, setEnvironment] = useState('');
  const [style, setStyle] = useState('photorealistic');
  const [lighting, setLighting] = useState('');
  const [mood, setMood] = useState('');
  const [cameraDetails, setCameraDetails] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB');
        return;
      }
      
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview('');
  };

  const styleOptions = [
    'photorealistic',
    'cinematic',
    'oil painting',
    'watercolor',
    'charcoal drawing',
    'anime',
    'cartoon illustration',
    'vintage',
    'film noir',
    'modern illustration',
    '3D render',
    'digital art'
  ];

  const lightingOptions = [
    'natural sunlight',
    'golden hour',
    'blue hour',
    'studio lighting',
    'neon lights',
    'candlelight',
    'dramatic shadows',
    'soft diffused light',
    'harsh direct light',
    'backlighting'
  ];

  const moodOptions = [
    'peaceful',
    'dramatic',
    'mysterious',
    'joyful',
    'melancholic',
    'energetic',
    'surreal',
    'romantic',
    'futuristic',
    'vintage'
  ];

  const generatePrompt = () => {
    if (!subject.trim()) {
      alert('Mohon masukkan subjek gambar');
      return;
    }

    let prompt = `Create a ${style} image of ${subject}`;
    
    if (action.trim()) {
      prompt += `. The subject is ${action}`;
    }
    
    if (environment.trim()) {
      prompt += `, set in ${environment}`;
    }
    
    if (lighting.trim()) {
      prompt += `. The scene is illuminated by ${lighting}`;
    }
    
    if (mood.trim()) {
      prompt += `, creating a ${mood} atmosphere`;
    }
    
    if (cameraDetails.trim()) {
      prompt += `. Captured with ${cameraDetails}`;
    }
    
    prompt += `. Aspect ratio: ${aspectRatio}.`;

    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setSubject('');
    setAction('');
    setEnvironment('');
    setStyle('photorealistic');
    setLighting('');
    setMood('');
    setCameraDetails('');
    setAspectRatio('16:9');
    setGeneratedPrompt('');
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Header */}
        <div className="header-section">
          <h1 className="app-title">✨ Photo Prompt Generator</h1>
          <p className="app-subtitle">Buat prompt AI yang sempurna untuk Gemini Image Generation</p>
        </div>

        <div className="main-layout">
          {/* Left Panel - Input */}
          <div className="left-panel">
            <div className="card">
              {/* Image Upload Section */}
              <div className="upload-section">
                <label className="section-label">📸 Upload Gambar Referensi</label>
                {!imagePreview ? (
                  <div className="upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden-input"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="upload-label">
                      <Upload size={32} className="upload-icon" />
                      <p className="upload-title">Klik atau drag gambar ke sini</p>
                      <p className="upload-subtitle">Format: JPG, PNG, GIF (Max 5MB)</p>
                    </label>
                  </div>
                ) : (
                  <div className="image-preview-container">
                    <div className="image-wrapper">
                      <img 
                        src={imagePreview} 
                        alt="preview" 
                        className="preview-image"
                      />
                      <button
                        onClick={removeImage}
                        className="remove-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="file-info">
                      📄 File: {uploadedImage.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="form-section">
                {/* Subject */}
                <div className="form-group">
                  <label className="form-label">Subjek Gambar *</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="contoh: seorang wanita dalam gaun merah"
                    className="form-input"
                  />
                </div>

                {/* Action */}
                <div className="form-group">
                  <label className="form-label">Aksi/Ekspresi</label>
                  <input
                    type="text"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    placeholder="contoh: berlari melalui taman dengan senyuman bahagia"
                    className="form-input"
                  />
                </div>

                {/* Environment */}
                <div className="form-group">
                  <label className="form-label">Lingkungan/Setting</label>
                  <input
                    type="text"
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    placeholder="contoh: taman bunga di musim semi"
                    className="form-input"
                  />
                </div>

                {/* Style */}
                <div className="form-group">
                  <label className="form-label">Gaya Seni</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="form-select"
                  >
                    {styleOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Lighting */}
                <div className="form-group">
                  <label className="form-label">Pencahayaan</label>
                  <select
                    value={lighting}
                    onChange={(e) => setLighting(e.target.value)}
                    className="form-select"
                  >
                    <option value="">-- Pilih pencahayaan --</option>
                    {lightingOptions.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* Mood */}
                <div className="form-group">
                  <label className="form-label">Suasana/Mood</label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="form-select"
                  >
                    <option value="">-- Pilih mood --</option>
                    {moodOptions.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Camera Details */}
                <div className="form-group">
                  <label className="form-label">Detail Kamera</label>
                  <input
                    type="text"
                    value={cameraDetails}
                    onChange={(e) => setCameraDetails(e.target.value)}
                    placeholder="contoh: professional DSLR, wide-angle lens"
                    className="form-input"
                  />
                </div>

                {/* Aspect Ratio */}
                <div className="form-group">
                  <label className="form-label">Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="form-select"
                  >
                    <option value="1:1">1:1 (Square)</option>
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="9:16">9:16 (Portrait)</option>
                    <option value="3:2">3:2 (Classic)</option>
                    <option value="2:3">2:3 (Portrait Classic)</option>
                    <option value="4:5">4:5 (Instagram Portrait)</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="button-group">
                <button
                  onClick={generatePrompt}
                  className="btn-primary"
                >
                  ✨ Generate Prompt
                </button>
                <button
                  onClick={reset}
                  className="btn-reset"
                  title="Reset semua field"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="right-panel">
            <div className="card card-output">
              <h2 className="output-title">📝 Prompt Anda</h2>
              
              {imagePreview && (
                <div className="output-image-section">
                  <p className="output-image-label">🖼️ Gambar Referensi:</p>
                  <img 
                    src={imagePreview} 
                    alt="uploaded" 
                    className="output-image"
                  />
                </div>
              )}
              
              {generatedPrompt ? (
                <div className="output-content">
                  <div className="prompt-box">
                    <p className="prompt-text">{generatedPrompt}</p>
                  </div>
                  
                  <div className="output-buttons">
                    <button
                      onClick={copyToClipboard}
                      className={`btn-output ${copied ? 'btn-success' : 'btn-copy'}`}
                    >
                      <Copy size={18} />
                      {copied ? '✓ Tersalin!' : 'Copy Prompt'}
                    </button>
                    
                    <button
                      onClick={() => {
                        const element = document.createElement('a');
                        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generatedPrompt));
                        element.setAttribute('download', 'gemini-prompt.txt');
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                      }}
                      className="btn-output btn-download"
                    >
                      <Download size={18} />
                      Download TXT
                    </button>
                  </div>

                  <div className="info-box">
                    💡 <strong>Tip:</strong> Salin prompt ini dan gunakan di Gemini Image Generator untuk hasil terbaik!
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <p className="empty-title">Isi formulir di sebelah</p>
                  <p className="empty-title">dan klik "Generate Prompt"</p>
                  <p className="empty-subtitle">Prompt akan ditampilkan di sini</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Tips */}
        <div className="card footer-card">
          <h3 className="footer-title">💡 Tips untuk Prompt Terbaik:</h3>
          <div className="tips-grid">
            <div className="tip-item">
              <span className="tip-icon">✓</span>
              <p>Semakin detail prompt, semakin bagus hasil yang dihasilkan</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">✓</span>
              <p>Gunakan istilah fotografi seperti "wide-angle", "macro shot"</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">✓</span>
              <p>Sebutkan mood dan lighting untuk hasil yang lebih konsisten</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">✓</span>
              <p>Tambahkan detail tekstur seperti "high contrast", "cinematic"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;