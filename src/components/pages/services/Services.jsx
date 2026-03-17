import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Heart, Shield, Users, Activity, FileText, Home, Search, Car,
  Building, User, UserCheck, ArrowRightLeft, LifeBuoy,
  Stethoscope, Brain, HandHeart, Pill, Ambulance, Baby,
  BedDouble, Clipboard, ClipboardList, Clock, Dumbbell,
  Ear, Eye, FlaskConical, HandMetal, Headphones,
  Hospital, Leaf, Microscope, Moon, Phone, RefreshCw,
  Smile, Syringe, Thermometer, Accessibility, Apple,
  BadgeAlert, Bike, BookOpen, Briefcase, CookingPot,
  HeartPulse, HelpingHand, Landmark, Lightbulb, Map,
  MessageCircle, PersonStanding, Ribbon, ShieldPlus, Sparkles,
  Star, Sun, Truck, Utensils, Wallet, 
  Loader2,
} from "lucide-react";

const BASE_URL = "https://api.sewacareservices.com";
//const BASE_URL = "http://localhost/SewaHome/Backend";

const BRAND       = "#376082";
const BRAND_LIGHT = "#E8F4FD";
const BRAND_MID   = "#6B9BD2";

// Full icon map — covers every icon available in AdminServices
const ICON_MAP = {
  Heart, Shield, Users, Activity, FileText, Home, Search, Car,
  Building, User, UserCheck, ArrowRightLeft, LifeBuoy,
  Stethoscope, HeartPulse, Syringe, Pill, Thermometer, Microscope,
  FlaskConical, Ambulance, Hospital, ShieldPlus, BadgeAlert,
  Clipboard, ClipboardList, HandHeart, HelpingHand, Brain,
  Accessibility, PersonStanding, Baby, Ear, Eye,
  Smile, Ribbon, Apple, Leaf, Sun, Moon, Dumbbell, Bike,
  Utensils, CookingPot, Sparkles, Star, Phone, MessageCircle,
  Headphones, BookOpen, Briefcase, Lightbulb, Landmark, Wallet,
  Map, Truck, Clock, RefreshCw, BedDouble, HandMetal,
};

const categoryIconMap = {
  "HOME CARE SERVICES":           Heart,
  "TRANSITION & PLACEMENT":       ArrowRightLeft,
  "SUPPORT SERVICES":             LifeBuoy,
  "PROFESSIONAL CARE MANAGEMENT": Shield,
  "CLINICAL NURSING SERVICES":    Activity,
  "DEMENTIA CARE SPECIALISTS":    UserCheck,
};

const getIcon = (name) => ICON_MAP[name] ?? Heart;

// ─────────────────────────────────────────────────────────────────────────────
export default function Services() {
  const [serviceData, setServiceData] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [openCard,    setOpenCard]    = useState(null);
  const [openItem,    setOpenItem]    = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch(`${BASE_URL}/service/services.php`);
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Server returned invalid JSON — check services.php for PHP errors.");
        }
        if (!data.success) throw new Error(data.message ?? "Failed to load services");
        setServiceData(data.services ?? []);
      } catch (err) {
        console.error("[Services]", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const goTo = (serviceId, e) => {
    e?.stopPropagation();
    navigate(`/services/${serviceId}`);
  };

  const toggleCard = (catTitle) => {
    setOpenCard(prev => prev === catTitle ? null : catTitle);
    setOpenItem(null);
  };

  const toggleItem = (itemKey, e) => {
    e.stopPropagation();
    setOpenItem(prev => prev === itemKey ? null : itemKey);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 size={36} className="animate-spin" style={{ color: BRAND }} />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[400px] px-4">
      <div className="text-center max-w-md">
        <p className="text-lg font-semibold text-gray-700 mb-2">Could not load services</p>
        <p className="text-sm text-gray-500 mb-4">{error}</p>
        <button
          onClick={() => { setError(null); setLoading(true); }}
          className="px-4 py-2 rounded-lg text-white text-sm"
          style={{ backgroundColor: BRAND }}
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-white to-gray-50" id="our-services">

      {/* Hero */}
      <div className="text-center mb-16">
        <h1
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          style={{ fontFamily: "Chathura", color: BRAND }}
        >
          Expertly Managed, Whole-Person Home Care
        </h1>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Experience peace of mind with expertly managed home care. Our custom plans combine
          clinical support, geriatric expertise, and smart technology to promote your loved
          one's independence and well-being at home.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold text-center mb-12"
          style={{ fontFamily: "Chathura", color: BRAND }}
        >
          Explore Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {serviceData.map((category) => {
            // Use icon stored in DB if available, fall back to category name map
            const Icon     = category.icon ? getIcon(category.icon) : (categoryIconMap[category.title] ?? Heart);
            const cardOpen = openCard === category.title;
            const activeItems = (category.items ?? []).filter(item => item.isActive !== false);

            return (
              <div
                key={category.id ?? category.title}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundColor: BRAND_LIGHT }}
              >
                {/* Card header */}
                <button
                  onClick={() => toggleCard(category.title)}
                  className="w-full flex flex-col items-center justify-center text-center gap-3 h-48 px-6 transition-colors duration-200"
                  style={{ backgroundColor: cardOpen ? "white" : BRAND_LIGHT }}
                >
                  <div
                    className="p-3 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: cardOpen ? BRAND_LIGHT : "rgba(255,255,255,0.6)" }}
                  >
                    <Icon
                      size={36}
                      style={{ color: cardOpen ? BRAND : BRAND_MID }}
                      className="transition-colors duration-200"
                    />
                  </div>

                  <h3
                    className="text-sm font-bold tracking-wide uppercase leading-snug transition-colors duration-200"
                    style={{ color: cardOpen ? BRAND : BRAND_MID, fontFamily: "outfit" }}
                  >
                    {category.title}
                  </h3>

                  <ChevronDown
                    size={18}
                    style={{
                      color: BRAND_MID,
                      transform: cardOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>

                {/* Expandable items list */}
                {cardOpen && (
                  <div className="bg-white border-t" style={{ borderColor: BRAND_LIGHT }}>
                    {activeItems.length === 0 ? (
                      <p className="px-5 py-4 text-sm text-gray-400 text-center">No services available.</p>
                    ) : (
                      activeItems.map((item) => {
                        const ItemIcon   = getIcon(item.icon);
                        const itemKey    = `${category.title}::${item.serviceId}`;
                        const itemOpen   = openItem === itemKey;
                        const activeSubs = (item.subItems ?? []).filter(s => s.isActive !== false);
                        const hasSub     = activeSubs.length > 0;

                        return (
                          <div
                            key={item.id ?? item.serviceId}
                            className="border-b last:border-0"
                            style={{ borderColor: BRAND_LIGHT }}
                          >
                            <button
                              onClick={hasSub ? (e) => toggleItem(itemKey, e) : (e) => goTo(item.serviceId, e)}
                              className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium transition-colors duration-150 text-left"
                              style={{
                                fontFamily: "outfit",
                                backgroundColor: itemOpen ? BRAND_LIGHT : "white",
                                color: itemOpen ? BRAND : "#374151",
                              }}
                            >
                              <span className="flex items-center gap-2">
                                <ItemIcon size={14} style={{ color: itemOpen ? BRAND : BRAND_MID, flexShrink: 0 }} />
                                {item.title}
                              </span>
                              {hasSub && (
                                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                  <span
                                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                    style={{
                                      backgroundColor: itemOpen ? BRAND : BRAND_LIGHT,
                                      color: itemOpen ? "white" : BRAND_MID,
                                    }}
                                  >
                                    {activeSubs.length}
                                  </span>
                                  <ChevronDown
                                    size={13}
                                    style={{
                                      color: BRAND_MID,
                                      transform: itemOpen ? "rotate(180deg)" : "rotate(0deg)",
                                      transition: "transform 0.2s ease",
                                    }}
                                  />
                                </div>
                              )}
                            </button>

                            {/* Sub-items */}
                            {hasSub && itemOpen && (
                              <div className="pb-2 pt-1 px-5" style={{ backgroundColor: BRAND_LIGHT }}>
                                {activeSubs.map((sub) => {
                                  const SubIcon = getIcon(sub.icon);
                                  return (
                                    <button
                                      key={sub.id ?? sub.serviceId}
                                      onClick={(e) => goTo(sub.serviceId, e)}
                                      className="w-full text-left flex items-center gap-2 py-1.5 px-2 rounded text-xs transition-all duration-150"
                                      style={{ color: "#4b5563", fontFamily: "outfit" }}
                                      onMouseEnter={e => {
                                        e.currentTarget.style.color = BRAND;
                                        e.currentTarget.style.backgroundColor = "white";
                                      }}
                                      onMouseLeave={e => {
                                        e.currentTarget.style.color = "#4b5563";
                                        e.currentTarget.style.backgroundColor = "transparent";
                                      }}
                                    >
                                      <SubIcon size={12} style={{ flexShrink: 0, color: BRAND_MID }} />
                                      {sub.title}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}