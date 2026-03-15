import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Eye, Save, X,
  Heart, Shield, Users, Activity, FileText, Home, Search, Car,
  Building, User, UserCheck, ArrowRightLeft, LifeBuoy,
  EyeOff, Loader2, ChevronDown, ChevronRight, FolderOpen,
  // ── New icons ──
  Stethoscope, Brain, HandHeart, Pill, Ambulance, Baby,
  BedDouble, Clipboard, ClipboardList, Clock, Dumbbell,
  Ear, Eye as EyeIcon, FlaskConical, HandMetal, Headphones,
  Hospital, Leaf, Microscope, Moon, Phone, RefreshCw,
  Smile, Syringe, Thermometer, Accessibility, Apple,
  BadgeAlert, Bike, BookOpen, Briefcase, CookingPot,
  HeartPulse, HelpingHand, Landmark, Lightbulb, Map,
  MessageCircle, PersonStanding, Ribbon, ShieldPlus, Sparkles,
  Star, Sun, Truck, Utensils, Wallet, 
} from 'lucide-react';

const BASE_URL = 'https://sewacareservices.com';
// const BASE_URL = 'http://localhost/SewaHome';

const ICON_OPTIONS = [
  // ── Original ──
  { name: 'Heart',            component: Heart },
  { name: 'Shield',           component: Shield },
  { name: 'Users',            component: Users },
  { name: 'Activity',         component: Activity },
  { name: 'FileText',         component: FileText },
  { name: 'Home',             component: Home },
  { name: 'Search',           component: Search },
  { name: 'Car',              component: Car },
  { name: 'Building',         component: Building },
  { name: 'User',             component: User },
  { name: 'UserCheck',        component: UserCheck },
  { name: 'ArrowRightLeft',   component: ArrowRightLeft },
  { name: 'LifeBuoy',         component: LifeBuoy },
  // ── Medical & Clinical ──
  { name: 'Stethoscope',      component: Stethoscope },
  { name: 'HeartPulse',       component: HeartPulse },
  { name: 'Syringe',          component: Syringe },
  { name: 'Pill',             component: Pill },
  { name: 'Thermometer',      component: Thermometer },
  { name: 'Microscope',       component: Microscope },
  { name: 'FlaskConical',     component: FlaskConical },
  { name: 'Ambulance',        component: Ambulance },
  { name: 'Hospital',         component: Hospital },
  { name: 'ShieldPlus',       component: ShieldPlus },
  { name: 'BadgeAlert',       component: BadgeAlert },
  { name: 'Clipboard',        component: Clipboard },
  { name: 'ClipboardList',    component: ClipboardList },
  // ── Care & Support ──
  { name: 'HandHeart',        component: HandHeart },
  { name: 'HelpingHand',      component: HelpingHand },
  { name: 'Brain',            component: Brain },
  { name: 'Accessibility',    component: Accessibility },
  { name: 'PersonStanding',   component: PersonStanding },
  { name: 'Baby',             component: Baby },
  { name: 'Ear',              component: Ear },
  { name: 'Eye',              component: EyeIcon },
  { name: 'Smile',            component: Smile },
  { name: 'Ribbon',           component: Ribbon },
  // ── Lifestyle & Wellness ──
  { name: 'Apple',            component: Apple },
  { name: 'Leaf',             component: Leaf },
  { name: 'Sun',              component: Sun },
  { name: 'Moon',             component: Moon },
  { name: 'Dumbbell',         component: Dumbbell },
  { name: 'Bike',             component: Bike },
  { name: 'Utensils',         component: Utensils },
  { name: 'CookingPot',       component: CookingPot },
  { name: 'Sparkles',         component: Sparkles },
  { name: 'Star',             component: Star },
  // ── Communication & Admin ──
  { name: 'Phone',            component: Phone },
  { name: 'MessageCircle',    component: MessageCircle },
  { name: 'Headphones',       component: Headphones },
  { name: 'BookOpen',         component: BookOpen },
  { name: 'Briefcase',        component: Briefcase },
  { name: 'Lightbulb',        component: Lightbulb },
  { name: 'Landmark',         component: Landmark },
  { name: 'Wallet',           component: Wallet },
  { name: 'Map',              component: Map },
  { name: 'Truck',            component: Truck },
  { name: 'Clock',            component: Clock },
  { name: 'RefreshCw',        component: RefreshCw },
  { name: 'BedDouble',        component: BedDouble },
  { name: 'HandMetal',        component: HandMetal },
];

const EMPTY_FORM = {
  category_id:          '',
  parent_service_id:    '',
  service_id:           '',
  title:                '',
  icon_name:            'Heart',
  hover_info:           '',
  hero_image:           '',
  detailed_description: '',
  key_features:         [''],
  benefits:             [''],
  process:              [{ step: '', description: '' }],
  display_order:        0,
  is_active:            1,
};

const getIcon = (name) => (ICON_OPTIONS.find(o => o.name === name)?.component) ?? Heart;
const toSlug  = (t) => t.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-').substring(0,50);
const imgUrl  = (p) => !p ? '' : p.startsWith('http') ? p : `${BASE_URL}${p}`;

// Icon groups for organised display in the picker
const ICON_GROUPS = [
  {
    label: 'Original',
    names: ['Heart','Shield','Users','Activity','FileText','Home','Search','Car','Building','User','UserCheck','ArrowRightLeft','LifeBuoy'],
  },
  {
    label: 'Medical & Clinical',
    names: ['Stethoscope','HeartPulse','Syringe','Pill','Thermometer','Microscope','FlaskConical','Ambulance','Hospital','ShieldPlus','BadgeAlert','Clipboard','ClipboardList'],
  },
  {
    label: 'Care & Support',
    names: ['HandHeart','HelpingHand','Brain','Accessibility','PersonStanding','Baby','Ear','Eye','Smile','Ribbon'],
  },
  {
    label: 'Lifestyle & Wellness',
    names: ['Apple','Leaf','Sun','Moon','Dumbbell','Bike','Utensils','CookingPot','Sparkles','Star'],
  },
  {
    label: 'Communication & Admin',
    names: ['Phone','MessageCircle','Headphones','BookOpen','Briefcase','Lightbulb','Landmark','Wallet','Map','Truck','Clock','RefreshCw','BedDouble','HandMetal'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function AdminServices() {
  const [categories,      setCategories]      = useState([]);
  const [hierarchy,       setHierarchy]       = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [showModal,       setShowModal]       = useState(false);
  const [editMode,        setEditMode]        = useState(false);
  const [uploadingImage,  setUploadingImage]  = useState(false);
  const [submitting,      setSubmitting]      = useState(false);
  const [expandedCats,    setExpandedCats]    = useState({});
  const [expandedItems,   setExpandedItems]   = useState({});
  const [formData,        setFormData]        = useState(EMPTY_FORM);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [catRes, svcRes] = await Promise.all([
        fetch(`${BASE_URL}/Backend/service/get_categories.php`),
        fetch(`${BASE_URL}/Backend/service/get_services.php`),
      ]);
      const catData = await catRes.json();
      const svcData = await svcRes.json();
      if (catData.success) setCategories(catData.categories);
      if (svcData.success) setHierarchy(svcData.services);
    } catch (err) {
      alert('Error loading data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const topLevelServices = hierarchy.flatMap(cat => cat.items ?? []);

  const setField = (name, value) => setFormData(p => ({ ...p, [name]: value }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({
      ...p,
      [name]: value,
      ...(name === 'title' && !editMode && { service_id: toSlug(value) }),
      ...(name === 'parent_service_id' && value && {
        category_id: topLevelServices.find(s => String(s.id) === String(value))?.categoryId ?? p.category_id,
      }),
    }));
  };

  const handleArrayChange   = (i, v, f)  => setFormData(p => ({ ...p, [f]: p[f].map((x, j) => j === i ? v : x) }));
  const handleProcessChange = (i, k, v)  => setFormData(p => ({ ...p, process: p.process.map((x, j) => j === i ? { ...x, [k]: v } : x) }));
  const addArrayItem        = (f)         => setFormData(p => ({ ...p, [f]: [...p[f], f === 'process' ? { step: '', description: '' } : ''] }));
  const removeArrayItem     = (i, f)      => { if (formData[f].length > 1) setFormData(p => ({ ...p, [f]: p[f].filter((_, j) => j !== i) })); };

  const openAdd = (prefillCategoryId = '', prefillParentId = '') => {
    setEditMode(false);
    setFormData({ ...EMPTY_FORM, category_id: prefillCategoryId, parent_service_id: prefillParentId, display_order: topLevelServices.length + 1 });
    setShowModal(true);
  };

  const openEdit = (svc) => {
    setEditMode(true);
    setFormData({
      id:                   svc.id,
      category_id:          svc.categoryId        ?? '',
      parent_service_id:    svc.parentServiceId   ?? '',
      service_id:           svc.serviceId,
      title:                svc.title,
      icon_name:            svc.icon,
      hover_info:           svc.hoverInfo,
      hero_image:           svc.heroImage         ?? '',
      detailed_description: svc.detailedDescription,
      key_features:         svc.keyFeatures?.length ? svc.keyFeatures : [''],
      benefits:             svc.benefits?.length    ? svc.benefits    : [''],
      process:              svc.process?.length     ? svc.process     : [{ step: '', description: '' }],
      display_order:        svc.displayOrder,
      is_active:            svc.isActive ? 1 : 0,
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024)    { alert('Max image size is 5 MB'); return; }
    try {
      setUploadingImage(true);
      const fd = new FormData();
      fd.append('hero_image', file);
      const res  = await fetch(`${BASE_URL}/Backend/service/upload_image.php`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) setField('hero_image', data.image_path);
      else throw new Error(data.message);
    } catch (err) {
      alert('Upload failed: ' + err.message);
      setField('hero_image', '');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category_id)       { alert('Please select a category'); return; }
    if (!formData.service_id.trim()) { alert('Service ID is required');   return; }

    const payload = {
      ...formData,
      category_id:       parseInt(formData.category_id),
      parent_service_id: formData.parent_service_id ? parseInt(formData.parent_service_id) : null,
      key_features:      formData.key_features.filter(f => f.trim()),
      benefits:          formData.benefits.filter(b => b.trim()),
      process:           formData.process.filter(p => p.step.trim() && p.description.trim()),
    };

    const url = editMode
      ? `${BASE_URL}/Backend/service/update_service.php`
      : `${BASE_URL}/Backend/service/add_service.php`;

    try {
      setSubmitting(true);
      const res  = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) { setShowModal(false); loadAll(); }
      else throw new Error(data.message);
    } catch (err) {
      alert('Error saving service: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (svc) => {
    if (!window.confirm(`${svc.isActive ? 'Deactivate' : 'Activate'} "${svc.title}"?`)) return;
    try {
      const res  = await fetch(`${BASE_URL}/Backend/service/update_service.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: svc.id, is_active: svc.isActive ? 0 : 1 }),
      });
      const data = await res.json();
      if (data.success) loadAll();
      else alert(data.message);
    } catch (err) { alert('Error: ' + err.message); }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This also deletes all its sub-items.`)) return;
    try {
      const res  = await fetch(`${BASE_URL}/Backend/service/delete_service.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) loadAll();
      else alert(data.message);
    } catch (err) { alert('Error: ' + err.message); }
  };

  const toggleCat  = (id) => setExpandedCats(p  => ({ ...p, [id]: !p[id] }));
  const toggleItem = (id) => setExpandedItems(p => ({ ...p, [id]: !p[id] }));

  const ServiceRow = ({ svc, indent = false, catId }) => {
    const Icon    = getIcon(svc.icon);
    const hasSubs = svc.subItems?.length > 0;
    const open    = expandedItems[svc.id];

    return (
      <>
        <div className={`flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors ${indent ? 'pl-10 border-l-2 border-blue-100 ml-6' : ''}`}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {hasSubs && (
              <button onClick={() => toggleItem(svc.id)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            )}
            {!hasSubs && <span className="w-[14px] flex-shrink-0" />}

            <div className="p-1.5 rounded-md bg-blue-50 flex-shrink-0">
              <Icon size={16} className="text-[#376082]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm text-gray-900 truncate">{svc.title}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${svc.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {svc.isActive ? 'Active' : 'Inactive'}
                </span>
                {hasSubs && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                    {svc.subItems.length} sub-items
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 truncate">{svc.serviceId}</p>
            </div>
          </div>

          <div className="flex gap-1 flex-shrink-0 ml-2">
            {!indent && (
              <button onClick={() => openAdd(String(catId), String(svc.id))} title="Add sub-item" className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors">
                <Plus size={15} />
              </button>
            )}
            <button onClick={() => toggleActive(svc)} title={svc.isActive ? 'Deactivate' : 'Activate'} className={`p-1.5 rounded-md transition-colors ${svc.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}>
              {svc.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
            </button>
            <button onClick={() => openEdit({ ...svc, categoryId: catId })} title="Edit" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              <Edit size={15} />
            </button>
            <button onClick={() => handleDelete(svc.id, svc.title)} title="Delete" className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {hasSubs && open && svc.subItems.map(sub => (
          <ServiceRow key={sub.id} svc={sub} indent catId={catId} />
        ))}
      </>
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={32} className="animate-spin text-[#376082]" />
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => openAdd()} className="bg-[#376082] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a4a66] transition-colors text-sm font-medium">
          <Plus size={18} /> Add Service
        </button>
      </div>

      {hierarchy.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <FolderOpen size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No services yet.</p>
          <button onClick={() => openAdd()} className="mt-4 bg-[#376082] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2a4a66] transition-colors">
            Add First Service
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {hierarchy.map(cat => (
            <div key={cat.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-[#376082] cursor-pointer select-none" onClick={() => toggleCat(cat.id)}>
                <div className="flex items-center gap-2">
                  <ChevronDown size={16} className={`text-white/80 transition-transform duration-200 ${expandedCats[cat.id] ? '' : '-rotate-90'}`} />
                  <span className="text-sm font-medium tracking-widest uppercase text-white">{cat.title}</span>
                  <span className="text-xs text-white/60 ml-1">{cat.items?.length ?? 0} items</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); openAdd(String(cat.id)); }} className="flex items-center gap-1 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors">
                  <Plus size={13} /> Add to this category
                </button>
              </div>

              {expandedCats[cat.id] && (
                <div className="divide-y divide-gray-100">
                  {cat.items?.length > 0 ? (
                    cat.items.map(svc => <ServiceRow key={svc.id} svc={svc} catId={cat.id} />)
                  ) : (
                    <p className="text-sm text-gray-400 px-4 py-4 text-center">No services in this category yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[92vh] flex flex-col">

            <div className="flex justify-between items-center px-6 py-4 border-b flex-shrink-0">
              <h2 className="text-xl font-bold text-[#376082]">{editMode ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setShowModal(false)} disabled={submitting} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

              {/* Category + Parent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select name="category_id" value={formData.category_id} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]">
                    <option value="">— Select category —</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Parent Service <span className="text-gray-400 font-normal">(leave blank for top-level)</span></label>
                  <select name="parent_service_id" value={formData.parent_service_id} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]">
                    <option value="">— Top-level item —</option>
                    {topLevelServices
                      .filter(s => !editMode || s.id !== formData.id)
                      .filter(s => !formData.category_id || String(s.categoryId) === String(formData.category_id))
                      .map(s => <option key={s.id} value={s.id}>{s.title}</option>)
                    }
                  </select>
                </div>
              </div>

              {/* Title + Service ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Title <span className="text-red-500">*</span></label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Personal Care & Companionship" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Service ID (slug) <span className="text-red-500">*</span></label>
                  <input type="text" name="service_id" value={formData.service_id} onChange={handleInputChange} required placeholder="auto-generated from title" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#376082] bg-gray-50" />
                  <p className="text-xs text-gray-400 mt-1">Used in the URL — edit with care</p>
                </div>
              </div>

              {/* ── Icon picker — grouped ── */}
              <div>
                <label className="block text-sm font-medium mb-2">Icon <span className="text-red-500">*</span></label>
                <div className="space-y-3 border border-gray-200 rounded-lg p-3 max-h-64 overflow-y-auto">
                  {ICON_GROUPS.map(group => (
                    <div key={group.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">{group.label}</p>
                      <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5">
                        {group.names.map(name => {
                          const Ic = getIcon(name);
                          return (
                            <button
                              key={name}
                              type="button"
                              onClick={() => setField('icon_name', name)}
                              title={name}
                              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg border-2 text-[9px] transition-all ${
                                formData.icon_name === name
                                  ? 'border-[#376082] bg-blue-50 text-[#376082]'
                                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <Ic size={18} />
                              <span className="truncate w-full text-center leading-tight">{name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Selected icon preview */}
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <span>Selected:</span>
                  <div className="flex items-center gap-1.5 bg-blue-50 border border-[#376082] rounded-lg px-2.5 py-1 text-[#376082]">
                    {React.createElement(getIcon(formData.icon_name), { size: 16 })}
                    <span className="font-medium text-xs">{formData.icon_name}</span>
                  </div>
                </div>
              </div>

              {/* Hero image */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Hero Image</label>
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#376082] file:text-white hover:file:bg-[#2a4a66]" />
                  {uploadingImage && <Loader2 size={18} className="animate-spin text-[#376082] flex-shrink-0" />}
                </div>
                {formData.hero_image && (
                  <div className="mt-2 relative inline-block">
                    <img src={imgUrl(formData.hero_image)} alt="Preview" className="max-h-28 rounded-lg border object-cover" onError={e => e.target.style.display='none'} />
                    <button type="button" onClick={() => setField('hero_image', '')} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"><X size={13} /></button>
                  </div>
                )}
              </div>

              {/* Hover info */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Hover Info <span className="text-red-500">*</span></label>
                <textarea name="hover_info" value={formData.hover_info} onChange={handleInputChange} required rows={2} placeholder="Brief description" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]" />
              </div>

              {/* Detailed description */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Detailed Description <span className="text-red-500">*</span></label>
                <textarea name="detailed_description" value={formData.detailed_description} onChange={handleInputChange} required rows={5} placeholder="Full description" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]" />
              </div>

              {/* Key features */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Key Features</label>
                {formData.key_features.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={f} onChange={e => handleArrayChange(i, e.target.value, 'key_features')} placeholder={`Feature ${i + 1}`} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]" />
                    {formData.key_features.length > 1 && <button type="button" onClick={() => removeArrayItem(i, 'key_features')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><X size={16} /></button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('key_features')} className="text-[#376082] text-sm font-medium hover:underline">+ Add Feature</button>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Benefits</label>
                {formData.benefits.map((b, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={b} onChange={e => handleArrayChange(i, e.target.value, 'benefits')} placeholder={`Benefit ${i + 1}`} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]" />
                    {formData.benefits.length > 1 && <button type="button" onClick={() => removeArrayItem(i, 'benefits')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><X size={16} /></button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('benefits')} className="text-[#376082] text-sm font-medium hover:underline">+ Add Benefit</button>
              </div>

              {/* Process steps */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Process Steps</label>
                {formData.process.map((p, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3 mb-3 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Step {i + 1}</span>
                      {formData.process.length > 1 && <button type="button" onClick={() => removeArrayItem(i, 'process')} className="text-red-500 hover:text-red-600 text-xs">Remove</button>}
                    </div>
                    <input type="text" placeholder="Step title" value={p.step} onChange={e => handleProcessChange(i, 'step', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#376082]" />
                    <textarea placeholder="Step description" value={p.description} onChange={e => handleProcessChange(i, 'description', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]" />
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('process')} className="text-[#376082] text-sm font-medium hover:underline">+ Add Step</button>
              </div>

              {/* Status + display order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Status</label>
                  <select name="is_active" value={formData.is_active} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Display Order</label>
                  <input type="number" name="display_order" value={formData.display_order} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#376082]" />
                </div>
              </div>

              {/* Footer buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" disabled={submitting} className="flex-1 bg-[#376082] text-white py-2.5 rounded-lg hover:bg-[#2a4a66] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {submitting ? 'Saving…' : 'Save Service'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} disabled={submitting} className="px-6 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 disabled:cursor-not-allowed text-sm font-medium transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}