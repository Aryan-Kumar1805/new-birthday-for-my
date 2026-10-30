import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Heart, Plus, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { MemoryItem } from '../types';

interface PolaroidGalleryProps {
  memories: MemoryItem[];
  onAddMemory: (memory: MemoryItem) => void;
}

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ memories, onAddMemory }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [likedMemories, setLikedMemories] = useState<Record<string, number>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMemories((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate.trim() || 'A day to remember',
      location: newLocation.trim() || 'Our favorite spot',
      story: newStory.trim() || 'A beautiful chapter in our story together.',
      photoUrl: newPhotoUrl.trim() || undefined,
      tag: 'Cherished',
      caption: newTitle.trim(),
    };

    onAddMemory(newItem);
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewStory('');
    setNewPhotoUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Rotation angles for organic polaroid feel
  const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-3', 'rotate-2'];

  return (
    <section id="memories" className="py-20 bg-stone-100/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold tracking-wider uppercase mb-2">
              <Camera className="w-4 h-4" />
              <span>Snapshot of Our Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              The Memory Vault
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Every photograph is a timestamp of pure happiness. Click any snapshot to read the full memory behind it.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-all hover:border-rose-300"
          >
            <Plus className="w-4 h-4 text-rose-500" />
            <span>Add A Memory</span>
          </button>
        </div>

        {/* Polaroids Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {memories.map((mem, index) => {
            const rotClass = rotations[index % rotations.length];
            const likes = likedMemories[mem.id] || 0;

            return (
              <div
                key={mem.id}
                onClick={() => setSelectedMemory(mem)}
                className={`group cursor-pointer bg-white p-4 pb-6 rounded-xs shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 ${rotClass} border border-stone-200/60 relative`}
              >
                {/* Washi Tape Strip on Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-200/60 backdrop-blur-xs rounded-xs rotate-1 shadow-2xs pointer-events-none" />

                {/* Photo Area */}
                <div className="w-full aspect-square bg-gradient-to-tr from-stone-800 to-stone-700 rounded-2xs overflow-hidden relative mb-4">
                  {mem.photoUrl ? (
                    <img
                      src={mem.photoUrl}
                      alt={mem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Artistic thematic vector silhouette placeholder */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br from-rose-900/90 via-pink-900/70 to-stone-900 relative">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                        <Heart className="w-6 h-6 text-rose-300 fill-rose-300" />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-rose-200/80 mb-1">
                        {mem.tag}
                      </span>
                      <p className="font-serif italic text-sm text-stone-100 max-w-[200px] line-clamp-2">
                        "{mem.caption}"
                      </p>
                    </div>
                  )}

                  {/* Heart reaction badge */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleLike(mem.id, e)}
                    className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 hover:bg-black/60 backdrop-blur-xs rounded-full flex items-center gap-1 text-white text-xs transition-colors"
                    aria-label={`Like ${mem.title}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likes > 0 ? 'fill-rose-400 text-rose-400' : 'text-white'}`} />
                    <span>{likes > 0 ? likes : ''}</span>
                  </button>
                </div>

                {/* Polaroid Bottom Handwritten Label */}
                <div className="px-1 text-center">
                  <h3 className="font-script text-2xl text-stone-800 leading-tight group-hover:text-rose-600 transition-colors">
                    {mem.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-stone-400 text-xs mt-1.5 font-sans">
                    <span>{mem.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate max-w-[130px]">{mem.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Memory Lightbox Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
              aria-label="Close memory preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>{selectedMemory.tag}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3">
              {selectedMemory.title}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mb-6 pb-4 border-b border-stone-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {selectedMemory.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {selectedMemory.location}
              </span>
            </div>

            {selectedMemory.photoUrl && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-stone-100">
                <img
                  src={selectedMemory.photoUrl}
                  alt={selectedMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed text-sm sm:text-base space-y-4 mb-8">
              <p>{selectedMemory.story}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <button
                onClick={() => handleToggleLike(selectedMemory.id)}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-full text-xs sm:text-sm font-semibold transition-colors"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Loving this memory ({likedMemories[selectedMemory.id] || 0})</span>
              </button>

              <button
                onClick={() => setSelectedMemory(null)}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
              Add a Cherished Memory
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Capture a special moment between the two of you with photo and backstory.
            </p>

            <form onSubmit={handleCreateMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Memory Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Stargazing on the roof"
                  className="w-full text-sm rounded-xl border border-stone-200 px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. June 14, 2024"
                    className="w-full text-sm rounded-xl border border-stone-200 px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Kyoto Gardens"
                    className="w-full text-sm rounded-xl border border-stone-200 px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Photo (Upload or Web URL)
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs text-stone-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                  />
                  <input
                    type="url"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="Or paste an image URL..."
                    className="w-full text-xs rounded-xl border border-stone-200 px-3 py-2 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  The Story & Details
                </label>
                <textarea
                  rows={3}
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  placeholder="What made this day unforgettable..."
                  className="w-full text-sm rounded-xl border border-stone-200 p-3 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-stone-600 text-xs font-medium hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold shadow-xs"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
