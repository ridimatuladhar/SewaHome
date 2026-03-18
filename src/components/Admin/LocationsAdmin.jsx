import React, { useEffect, useState, useCallback } from 'react';
import { MapPin, Phone, Mail, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Save } from 'lucide-react';

const API = 'https://api.sewacareservices.com/locations/manage_locations.php';
//const API = 'http://localhost/SewaHome/Backend/locations/manage_locations.php';

const emptyForm = {
  state_name: '', address_line1: '', address_line2: '',
  address_line3: '', phone: '', email: '', maps_url: '', display_order: 0,
};

const LocationsAdmin = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm]           = useState(emptyForm);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState(null);

  // ── Fetch all locations ──
  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true);
      const res  = await fetch(API);
      const data = await res.json();
      if (data.success) setLocations(data.locations);
    } catch (e) {
      setError('Failed to load locations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLocations(); }, [fetchLocations]);

  // ── Open form for add or edit ──
  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (loc) => {
    setForm({
      state_name: loc.state_name, address_line1: loc.address_line1,
      address_line2: loc.address_line2 || '', address_line3: loc.address_line3 || '',
      phone: loc.phone, email: loc.email,
      maps_url: loc.maps_url || '', display_order: loc.display_order,
    });
    setEditingId(loc.id);
    setShowForm(true);
  };

  // ── Save (add or edit) ──
  const handleSave = async () => {
    if (!form.state_name || !form.address_line1 || !form.phone || !form.email) {
      setError('State name, address, phone and email are required.');
      return;
    }
    try {
      setSaving(true);
      setError(null);
      const res = await fetch(API, {
        method:  editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });
      const data = await res.json();
      if (data.success) { setShowForm(false); fetchLocations(); }
      else setError(data.message);
    } catch (e) {
      setError('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle active ──
  const handleToggle = async (id) => {
    await fetch(API, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ toggle_active: true, id }),
    });
    fetchLocations();
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this location?')) return;
    await fetch(API, {
      method:  'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id }),
    });
    fetchLocations();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-700">Manage Locations</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Location
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* ── Location cards ── */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-3">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`border rounded-lg p-4 flex items-start justify-between gap-4 ${
                loc.is_active == 1 ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300 opacity-60'
              }`}
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-slate-700">{loc.state_name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${loc.is_active == 1 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                    {loc.is_active == 1 ? 'Active' : 'Hidden'}
                  </span>
                  <span className="text-xs text-gray-400">Order: {loc.display_order}</span>
                </div>
                <div className="flex items-start gap-1 text-sm text-gray-600">
                  <MapPin size={13} className="mt-0.5 flex-shrink-0" />
                  <span>{[loc.address_line1, loc.address_line2, loc.address_line3].filter(Boolean).join(' ')}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Phone size={13} /> <span>{loc.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Mail size={13} /> <span>{loc.email}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleToggle(loc.id)} title={loc.is_active == 1 ? 'Hide' : 'Show'}>
                  {loc.is_active == 1
                    ? <ToggleRight size={22} className="text-green-500 hover:text-green-700" />
                    : <ToggleLeft  size={22} className="text-gray-400 hover:text-gray-600" />}
                </button>
                <button onClick={() => openEdit(loc)} title="Edit">
                  <Pencil size={16} className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => handleDelete(loc.id)} title="Delete">
                  <Trash2 size={16} className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-semibold">{editingId ? 'Edit Location' : 'Add New Location'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>

            <div className="p-5 space-y-3">
              {[
                { label: 'State / Region Name *', key: 'state_name',    placeholder: 'e.g. Massachusetts' },
                { label: 'Address Line 1 *',       key: 'address_line1', placeholder: '270 Littleton Rd, Ste 10,' },
                { label: 'Address Line 2',          key: 'address_line2', placeholder: 'Westford, MA 01886,' },
                { label: 'Address Line 3',          key: 'address_line3', placeholder: 'United States' },
                { label: 'Phone *',                 key: 'phone',         placeholder: '9786777012' },
                { label: 'Email *',                 key: 'email',         placeholder: 'office@sewahomecare.com' },
                { label: 'Google Maps URL',         key: 'maps_url',      placeholder: 'https://maps.google.com/...' },
                { label: 'Display Order',           key: 'display_order', placeholder: '1', type: 'number' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type || 'text'}
                    value={form[key]}
                    onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>

            <div className="flex justify-end gap-3 p-5 border-t">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={14} /> {saving ? 'Saving...' : 'Save Location'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsAdmin;