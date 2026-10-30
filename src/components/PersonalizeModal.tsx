import React, { useState } from 'react';
import { Sliders, X, Save, RotateCcw, Download, Upload, Check, Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { INITIAL_BIRTHDAY_CONFIG } from '../utils/defaultData';

interface PersonalizeModalProps {
  config: BirthdayConfig;
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig: (newConfig: BirthdayConfig) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  config,
  isOpen,
  onClose,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<BirthdayConfig>(config);
  const [saveNotice, setSaveNotice] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof BirthdayConfig, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSaveNotice(true);
    setTimeout(() => {
      setSaveNotice(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('Reset all details back to the original template?')) {
      setFormData(INITIAL_BIRTHDAY_CONFIG);
      onSaveConfig(INITIAL_BIRTHDAY_CONFIG);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${formData.girlfriendName.toLowerCase()}_birthday_website.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target?.result as string);
          if (parsed.girlfriendName) {
            setFormData(parsed);
            onSaveConfig(parsed);
          }
        } catch {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Personalization Studio
              </h3>
              <p className="text-xs text-stone-500">
                Customize every name, date, and romantic message for your girlfriend.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-800 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center transition-colors"
            aria-label="Close customizer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="overflow-y-auto py-5 space-y-5 flex-1 pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Her Name *
              </label>
              <input
                type="text"
                required
                value={formData.girlfriendName}
                onChange={(e) => handleChange('girlfriendName', e.target.value)}
                placeholder="e.g. Maya"
                className="w-full text-sm rounded-xl border border-stone-200 px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.boyfriendName}
                onChange={(e) => handleChange('boyfriendName', e.target.value)}
                placeholder="e.g. Alex"
                className="w-full text-sm rounded-xl border border-stone-200 px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Her Birthday Date *
              </label>
              <input
                type="date"
                required
                value={formData.birthdayDate}
                onChange={(e) => handleChange('birthdayDate', e.target.value)}
                className="w-full text-sm rounded-xl border border-stone-200 px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Age Milestone
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.ageMilestone}
                onChange={(e) => handleChange('ageMilestone', parseInt(e.target.value) || 24)}
                className="w-full text-sm rounded-xl border border-stone-200 px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Anniversary Date
              </label>
              <input
                type="date"
                value={formData.anniversaryDate}
                onChange={(e) => handleChange('anniversaryDate', e.target.value)}
                className="w-full text-sm rounded-xl border border-stone-200 px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Sweet Subtitle / Message
            </label>
            <textarea
              rows={2}
              value={formData.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              className="w-full text-sm rounded-xl border border-stone-200 p-3 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Your Personal Birthday Wish for Her
            </label>
            <textarea
              rows={2}
              value={formData.customWish}
              onChange={(e) => handleChange('customWish', e.target.value)}
              placeholder="The wish she will read when blowing out the candles..."
              className="w-full text-sm rounded-xl border border-stone-200 p-3 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400 resize-none"
            />
          </div>

          {/* Backup / Export / Import strip */}
          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportJson}
                className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700 font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <label className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700 font-medium cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJson}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-stone-400 hover:text-stone-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Defaults</span>
            </button>
          </div>

          {/* Bottom Save Action */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            {saveNotice ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" />
                <span>Changes Saved Successfully!</span>
              </span>
            ) : (
              <span className="text-xs text-stone-400">All changes save to your browser.</span>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save & Apply</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
