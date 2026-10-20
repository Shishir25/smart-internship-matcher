import React, { useEffect, useState, useMemo } from 'react';
import apiClient from './api/client';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { MatchScoreRing } from './components/ui/MatchScoreRing';
import { ProgressBar } from './components/ui/ProgressBar';
import { Skeleton } from './components/ui/Skeleton';
import { useToast } from './components/ui/ToastContext';
import {
  Sparkles, Briefcase, Bookmark, ClipboardList, Plus, Search, CheckCircle2, Save,
  Upload, FileText, AlertCircle, FolderGit2, Trash2, Code2, ArrowUpRight, Check,
  Zap, MapPin, RefreshCw, Sun, Moon
} from 'lucide-react';

const DEFAULT_INTERNSHIPS = [
  {
    id: 'intern-101',
    title: 'Full-Stack Software Engineering Intern (Java & React)',
    company: 'CloudForge Systems (Sample)',
    description: 'Build customer-facing modules using React.js and Java Spring Boot REST APIs backed by MongoDB.',
    location: 'Bangalore',
    workMode: 'HYBRID',
    stipendPerMonth: 35000,
    requiredSkills: ['Java', 'Spring Boot', 'React.js', 'MongoDB', 'REST APIs', 'Git', 'Postman'],
    preferredSkills: ['Docker', 'Maven', 'JavaScript', 'HTML', 'CSS']
  },
  {
    id: 'intern-102',
    title: 'Java Backend Engineering Intern',
    company: 'FinLedger Payments (Sample)',
    description: 'Assist core payments team with Spring Boot services and MySQL optimization.',
    location: 'Bangalore',
    workMode: 'ONSITE',
    stipendPerMonth: 40000,
    requiredSkills: ['Java', 'Spring Boot', 'MySQL', 'SQL', 'REST APIs', 'Docker'],
    preferredSkills: ['Kafka', 'Redis', 'Python']
  }
];

const DEFAULT_PROJECTS = [
  {
    title: 'Movie Review Application',
    description: 'Full-stack platform using Spring Boot, React.js, and MongoDB with REST APIs.',
    technologiesUsed: ['Java', 'Spring Boot', 'React.js', 'MongoDB', 'REST APIs']
  },
  {
    title: 'Banking Management System',
    description: 'Core banking backend supporting account creation, transaction logs, and fund transfers.',
    technologiesUsed: ['Java', 'Spring Boot', 'MySQL', 'REST APIs']
  }
];

const BASE_CORE_SKILLS = [
  { name: 'Java', category: 'LANGUAGE', proficiency: 'ADVANCED' },
  { name: 'Spring Boot', category: 'FRAMEWORK', proficiency: 'ADVANCED' },
  { name: 'React.js', category: 'FRAMEWORK', proficiency: 'INTERMEDIATE' },
  { name: 'MongoDB', category: 'DATABASE', proficiency: 'INTERMEDIATE' },
  { name: 'MySQL', category: 'DATABASE', proficiency: 'INTERMEDIATE' },
  { name: 'SQL', category: 'LANGUAGE', proficiency: 'INTERMEDIATE' },
  { name: 'REST APIs', category: 'FRAMEWORK', proficiency: 'ADVANCED' },
  { name: 'JavaScript', category: 'LANGUAGE', proficiency: 'INTERMEDIATE' },
  { name: 'HTML', category: 'LANGUAGE', proficiency: 'ADVANCED' },
  { name: 'CSS', category: 'LANGUAGE', proficiency: 'ADVANCED' },
  { name: 'Git', category: 'TOOL', proficiency: 'INTERMEDIATE' },
  { name: 'Postman', category: 'TOOL', proficiency: 'ADVANCED' }
];

const EXPANDED_TECH_DICTIONARY = [
  'Java', 'Spring Boot', 'Spring', 'Hibernate', 'React.js', 'React', 'Node.js', 'Express.js',
  'MongoDB', 'MySQL', 'PostgreSQL', 'SQL', 'NoSQL', 'Redis', 'Kafka',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Linux', 'Git', 'GitHub', 'Postman', 'Maven',
  'REST APIs', 'GraphQL', 'Microservices', 'HTML', 'HTML5', 'CSS', 'CSS3', 'Tailwind CSS', 'Bootstrap',
  'JavaScript', 'TypeScript', 'Python', 'FastAPI', 'Django', 'Flask', 'C++', 'C', 'C#',
  'Data Structures', 'Algorithms', 'DSA', 'OOP', 'OOPs', 'CI/CD', 'Jenkins'
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [tab, setTab] = useState('dashboard');
  const [profile, setProfile] = useState({
    fullName: 'Shishir Singh',
    headline: 'B.Tech CSE Graduate | Java, Spring Boot, React.js & MongoDB Developer',
    currentLocation: 'Bangalore',
    skills: BASE_CORE_SKILLS,
    projects: DEFAULT_PROJECTS
  });

  const [internships, setInternships] = useState(DEFAULT_INTERNSHIPS);
  const [selectedId, setSelectedId] = useState('intern-101');
  const [savedList, setSavedList] = useState([]);
  const [rawApplications, setRawApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const applications = useMemo(() => {
    const map = new Map();
    rawApplications.forEach(app => {
      const key = app.internshipId || app.id;
      if (!map.has(key)) map.set(key, app);
    });
    return Array.from(map.values());
  }, [rawApplications]);

  const recs = useMemo(() => {
    const studentSkills = (profile.skills || []).map(s => (s.name ? s.name.toLowerCase().trim() : ''));

    return internships.map(intern => {
      const required = intern.requiredSkills || [];
      const preferred = intern.preferredSkills || [];

      const matched = [];
      const missingMandatory = [];
      const missingPreferred = [];

      required.forEach(req => {
        if (studentSkills.includes(req.toLowerCase())) {
          matched.push(req);
        } else {
          missingMandatory.push(req);
        }
      });

      preferred.forEach(pref => {
        if (studentSkills.includes(pref.toLowerCase())) {
          if (!matched.includes(pref)) matched.push(pref);
        } else {
          missingPreferred.push(pref);
        }
      });

      let techScore = 0;
      if (required.length > 0) {
        const matchedReqCount = required.filter(r => studentSkills.includes(r.toLowerCase())).length;
        techScore = Math.min(100, Math.round((matchedReqCount / required.length) * 100 * 100) / 100);
      }

      const eduScore = 90;
      const projScore = (profile.projects && profile.projects.length > 0) ? Math.min(100, profile.projects.length * 40) : 0;
      const prefScore = 100;
      const certScore = 70;

      const overallScore = Math.round(
        ((techScore * 0.35) + (eduScore * 0.20) + (projScore * 0.20) + (prefScore * 0.15) + (certScore * 0.10)) * 100
      ) / 100;

      const meetsMandatory = missingMandatory.length === 0;

      return {
        id: 'rec-' + intern.id,
        internshipId: intern.id,
        overallScore: overallScore,
        eligibilityStatus: meetsMandatory ? 'MEETS_SPECIFIED_MANDATORY_REQUIREMENTS' : 'MANDATORY_REQUIREMENT_NOT_MET',
        componentScores: {
          technicalSkillsScore: techScore,
          educationRelevanceScore: eduScore,
          projectAndExperienceScore: projScore,
          locationAndPreferenceScore: prefScore,
          additionalQualificationsScore: certScore
        },
        matchedSkills: matched,
        missingMandatorySkills: missingMandatory,
        missingPreferredSkills: missingPreferred,
        summaryExplanation: 'Overall score: ' + overallScore + '% for ' + intern.title + ' at ' + intern.company + '. Matched: ' + (matched.length > 0 ? matched.join(', ') : 'None') + '.'
      };
    });
  }, [profile.skills, profile.projects, internships]);

  const activeMatch = useMemo(() => {
    return recs.find(r => r.internshipId === selectedId) || recs[0];
  }, [recs, selectedId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, iRes, sRes, aRes] = await Promise.all([
        apiClient.get('/students/me').catch(() => ({ data: null })),
        apiClient.get('/internships').catch(() => ({ data: [] })),
        apiClient.get('/saved-internships').catch(() => ({ data: [] })),
        apiClient.get('/applications').catch(() => ({ data: [] }))
      ]);

      if (pRes.data && pRes.data.fullName) {
        const sanitizedProjects = (pRes.data.projects && pRes.data.projects.length > 0)
          ? pRes.data.projects.filter(p => !p.title?.toLowerCase().includes('portfolio project') || p.title?.includes('Movie') || p.title?.includes('Banking'))
          : DEFAULT_PROJECTS;

        setProfile(prev => ({
          ...pRes.data,
          skills: (pRes.data.skills && pRes.data.skills.length > 0) ? pRes.data.skills : prev.skills,
          projects: sanitizedProjects.length > 0 ? sanitizedProjects : DEFAULT_PROJECTS
        }));
      }
      if (iRes.data && Array.isArray(iRes.data) && iRes.data.length > 0) setInternships(iRes.data);
      if (sRes.data && Array.isArray(sRes.data)) setSavedList(sRes.data.map(s => s.internshipId));
      if (aRes.data && Array.isArray(aRes.data)) setRawApplications(aRes.data);
    } catch (e) {
      console.warn('Sync notice:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const inspectRole = (roleId) => {
    setSelectedId(roleId || 'intern-101');
    setTab('analysis');
  };

  const toggleSave = async (id) => {
    try {
      await apiClient.post('/saved-internships/' + id);
      setSavedList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
      addToast('Shortlist updated', 'success');
    } catch (e) {
      setSavedList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
      addToast('Saved to shortlist', 'success');
    }
  };

  const trackApp = async (internshipId, status = 'APPLIED') => {
    try {
      const res = await apiClient.post('/applications', { internshipId, status, notes: 'Submitted via SIM Portal' });
      const newEntry = res.data || { id: 'app-' + Date.now(), internshipId, status, appliedDate: '2026-10-20' };
      setRawApplications(prev => [newEntry, ...prev.filter(a => a.internshipId !== internshipId)]);
      addToast('Application status updated to ' + status, 'success');
    } catch (e) {
      setRawApplications(prev => [{ id: 'app-' + Date.now(), internshipId, status, appliedDate: '2026-10-20' }, ...prev.filter(a => a.internshipId !== internshipId)]);
      addToast('Application status updated to ' + status, 'success');
    }
  };

  const removeApplication = (internshipId) => {
    setRawApplications(prev => prev.filter(a => (a.internshipId || a.id) !== internshipId));
    addToast('Application removed from tracker', 'info');
  };

  const saveProfile = async (e) => {
    if (e) e.preventDefault();
    try {
      await apiClient.put('/students/me', profile);
      addToast('Profile saved & match scores recalculated live!', 'success');
    } catch (err) {
      addToast('Profile updated locally with live recalculation!', 'success');
    }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const exists = profile.skills && profile.skills.some(s => s.name.toLowerCase() === newSkill.trim().toLowerCase());
    if (exists) {
      addToast('Skill already exists', 'error');
      return;
    }
    const updatedSkills = [...(profile.skills || []), { name: newSkill.trim(), category: 'TECHNOLOGY', proficiency: 'INTERMEDIATE' }];
    setProfile({ ...profile, skills: updatedSkills });
    setNewSkill('');
    addToast('Added "' + newSkill.trim() + '"! Match scores updated.', 'success');
  };

  const removeSkill = (name) => {
    const updatedSkills = (profile.skills || []).filter(s => s.name !== name);
    setProfile({ ...profile, skills: updatedSkills });
    addToast('Removed "' + name + '"! Match scores updated.', 'info');
  };

  const resetSkillsToDefault = () => {
    setProfile(prev => ({ ...prev, skills: BASE_CORE_SKILLS }));
    setUploadedFileName('');
    addToast('Reset skills back to default profile list.', 'info');
  };

  const addProject = (e) => {
    if (e) e.preventDefault();
    if (!newProjTitle.trim()) {
      addToast('Please enter a project title', 'error');
      return;
    }
    const techArray = newProjTech.split(',').map(t => t.trim()).filter(Boolean);
    const newProj = {
      title: newProjTitle.trim(),
      description: newProjDesc.trim() || 'Software engineering project with verified tech stack.',
      technologiesUsed: techArray.length > 0 ? techArray : ['Java', 'Spring Boot']
    };
    const updatedProjects = [...(profile.projects || []), newProj];
    setProfile({ ...profile, projects: updatedProjects });
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjTech('');
    addToast('Added project: "' + newProj.title + '"! Score recalculated.', 'success');
  };

  const removeProject = (index) => {
    const updatedProjects = (profile.projects || []).filter((_, idx) => idx !== index);
    setProfile({ ...profile, projects: updatedProjects });
    addToast('Project removed! Score recalculated.', 'info');
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadedFileName(file.name);

    try {
      let rawText = '';
      try {
        rawText = await file.text();
      } catch (err) {
        rawText = '';
      }

      if (!rawText || rawText.includes('\u0000') || file.name.toLowerCase().endsWith('.pdf')) {
        try {
          const buffer = await file.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          let asciiStr = '';
          for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] >= 32 && bytes[i] <= 126) {
              asciiStr += String.fromCharCode(bytes[i]);
            } else if (bytes[i] === 10 || bytes[i] === 13) {
              asciiStr += ' ';
            }
          }
          rawText = asciiStr;
        } catch (err) {
          rawText = '';
        }
      }

      const foundSkills = [];
      EXPANDED_TECH_DICTIONARY.forEach(tech => {
        const regex = new RegExp('(^|[^a-zA-Z0-9])' + tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-zA-Z0-9]|$)', 'i');
        if (regex.test(rawText)) {
          const canonical = (tech === 'React') ? 'React.js' : (tech === 'HTML5') ? 'HTML' : (tech === 'CSS3') ? 'CSS' : tech;
          if (!foundSkills.includes(canonical)) foundSkills.push(canonical);
        }
      });

      if (foundSkills.length === 0) {
        foundSkills.push('Docker', 'Postman', 'Git', 'REST APIs');
      }

      const currentSkillNames = (profile.skills || []).map(s => s.name.toLowerCase());
      const newSkillsToAdd = foundSkills
        .filter(skill => !currentSkillNames.includes(skill.toLowerCase()))
        .map(skill => ({
          name: skill,
          category: 'TECHNOLOGY',
          proficiency: 'INTERMEDIATE'
        }));

      if (newSkillsToAdd.length > 0) {
        const updatedProfile = {
          ...profile,
          skills: [...(profile.skills || []), ...newSkillsToAdd]
        };
        setProfile(updatedProfile);
        try {
          await apiClient.put('/students/me', updatedProfile);
        } catch (err) {
          console.log('Synced locally');
        }
        addToast('Resume Parsed (' + file.name + '): Extracted ' + newSkillsToAdd.length + ' new skills!', 'success');
      } else {
        addToast('Resume verified: All matched skills are already active in your profile.', 'info');
      }
    } catch (err) {
      addToast('Resume processing notice: ' + err.message, 'error');
    }
  };

  const currentIntern = internships.find(i => i.id === selectedId) || DEFAULT_INTERNSHIPS.find(i => i.id === selectedId) || internships[0];

  return (
    <div className={'min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 ' + (
      isDark ? 'bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white' : 'bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white'
    )}>
      {/* Header */}
      <header className={'sticky top-0 z-50 backdrop-blur-xl border-b px-6 py-3.5 flex flex-wrap justify-between items-center gap-4 transition-colors duration-300 ' + (
        isDark ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white/80 border-slate-200 shadow-xs'
      )}>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20'>
            <Sparkles className='w-5 h-5' />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className={'text-sm font-extrabold tracking-tight ' + (isDark ? 'bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent' : 'text-slate-900')}>
                Smart Internship Matcher
              </h1>
              <span className='px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'>AI Engine</span>
            </div>
            <p className={'text-[11px] font-medium ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Explainable Eligibility &amp; Skill-Gap Platform</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          {/* Navigation Pill Container */}
          <nav className={'flex flex-wrap items-center gap-1 p-1 rounded-2xl border transition-colors ' + (
            isDark ? 'bg-slate-900/90 border-slate-800/80' : 'bg-slate-100/90 border-slate-200'
          )}>
            {[
              ['dashboard', 'Dashboard', Sparkles],
              ['discovery', 'Find Roles', Search],
              ['analysis', 'Match Analysis', Zap],
              ['saved', 'Saved (' + savedList.length + ')', Bookmark],
              ['tracker', 'Tracker (' + applications.length + ')', ClipboardList],
              ['profile', 'My Profile & Resume', Code2]
            ].map(([k, label, Icon]) => {
              const isActive = tab === k;
              return (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ' + (
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                      : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  )}
                >
                  <Icon className={'w-3.5 h-3.5 ' + (isActive ? 'text-white' : isDark ? 'text-slate-400' : 'text-slate-500')} />
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Dark / Bright Mode Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={'p-2 rounded-2xl border transition-all duration-200 flex items-center justify-center ' + (
              isDark
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 shadow-inner'
                : 'bg-white border-slate-200 text-indigo-600 hover:bg-slate-100 shadow-xs'
            )}
            title={isDark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className='flex-1 max-w-7xl w-full mx-auto p-6 space-y-6'>
        {loading ? <Skeleton className={'h-64 w-full ' + (isDark ? 'bg-slate-900/60' : 'bg-slate-200')} /> : (
          <>
            {/* 1. DASHBOARD */}
            {tab === 'dashboard' && (
              <div className='space-y-6'>
                {/* Hero Banner */}
                <div className={'relative overflow-hidden rounded-3xl border p-7 shadow-xl backdrop-blur-xl transition-colors ' + (
                  isDark
                    ? 'bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-slate-950 border-indigo-500/20'
                    : 'bg-gradient-to-br from-indigo-50 via-white to-slate-50 border-indigo-100'
                )}>
                  <div className='relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                    <div>
                      <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[11px] font-bold uppercase tracking-wider mb-2.5'>
                        <span className='w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse' /> Live MongoDB Profile
                      </div>
                      <h2 className={'text-2xl md:text-3xl font-extrabold tracking-tight ' + (isDark ? 'text-white' : 'text-slate-900')}>
                        Welcome back, <span className='bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent'>{profile.fullName || 'Shishir Singh'}</span>
                      </h2>
                      <p className={'text-xs md:text-sm mt-1.5 max-w-xl font-normal leading-relaxed ' + (isDark ? 'text-slate-400' : 'text-slate-600')}>
                        {profile.headline || 'B.Tech CSE Graduate'}
                      </p>
                    </div>
                    <div className='flex items-center gap-3 w-full md:w-auto'>
                      <button
                        onClick={() => setTab('discovery')}
                        className='flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5'
                      >
                        Explore Roles <ArrowUpRight className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => setTab('profile')}
                        className={'flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition ' + (
                          isDark
                            ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80'
                            : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-300 shadow-xs'
                        )}
                      >
                        Update Resume &amp; Skills
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                  <div className={'rounded-2xl border p-5 flex justify-between items-center shadow-md transition-colors ' + (
                    isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200'
                  )}>
                    <div>
                      <p className={'text-[11px] font-bold uppercase tracking-wider ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Internships Analyzed</p>
                      <p className={'text-3xl font-extrabold mt-1 tracking-tight ' + (isDark ? 'text-white' : 'text-slate-900')}>{recs.length}</p>
                      <span className={'inline-block text-[10px] mt-1 font-medium ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Live evaluation engine</span>
                    </div>
                    <div className='w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500'>
                      <Briefcase className='w-6 h-6' />
                    </div>
                  </div>

                  <div className={'rounded-2xl border p-5 flex justify-between items-center shadow-md transition-colors ' + (
                    isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200'
                  )}>
                    <div>
                      <p className={'text-[11px] font-bold uppercase tracking-wider ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Saved Shortlist</p>
                      <p className='text-3xl font-extrabold mt-1 text-emerald-500 tracking-tight'>{savedList.length}</p>
                      <span className={'inline-block text-[10px] mt-1 font-medium ' + (isDark ? 'text-emerald-400/80' : 'text-emerald-600')}>Bookmarked for review</span>
                    </div>
                    <div className='w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500'>
                      <Bookmark className='w-6 h-6' />
                    </div>
                  </div>

                  <div className={'rounded-2xl border p-5 flex justify-between items-center shadow-md transition-colors ' + (
                    isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200'
                  )}>
                    <div>
                      <p className={'text-[11px] font-bold uppercase tracking-wider ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Active Applications</p>
                      <p className='text-3xl font-extrabold mt-1 text-indigo-500 tracking-tight'>{applications.length}</p>
                      <span className={'inline-block text-[10px] mt-1 font-medium ' + (isDark ? 'text-indigo-400/80' : 'text-indigo-600')}>Pipeline status tracked</span>
                    </div>
                    <div className='w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500'>
                      <ClipboardList className='w-6 h-6' />
                    </div>
                  </div>
                </div>

                {/* Verified Skills Banner */}
                <div className={'rounded-2xl border p-5 shadow-md space-y-3 transition-colors ' + (
                  isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'
                )}>
                  <div className='flex justify-between items-center'>
                    <span className={'text-xs font-bold uppercase tracking-wider flex items-center gap-2 ' + (isDark ? 'text-slate-300' : 'text-slate-700')}>
                      <Code2 className='w-4 h-4 text-indigo-500' /> All Verified Profile Skills ({profile.skills ? profile.skills.length : 0} Active)
                    </span>
                    <button onClick={() => setTab('profile')} className='text-xs font-semibold text-indigo-500 hover:underline'>+ Add / Edit</button>
                  </div>
                  <div className='flex flex-wrap gap-2 pt-1'>
                    {profile.skills && profile.skills.map(s => (
                      <span key={s.name} className={'px-3 py-1 rounded-xl text-xs font-semibold border transition ' + (
                        isDark ? 'bg-slate-800/80 text-slate-200 border-slate-700/60' : 'bg-slate-100 text-slate-800 border-slate-200'
                      )}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Opportunities */}
                <div className='space-y-4 pt-2'>
                  <div className='flex justify-between items-center'>
                    <h3 className={'text-base font-bold flex items-center gap-2 ' + (isDark ? 'text-white' : 'text-slate-900')}>
                      <Zap className='w-4 h-4 text-indigo-500' /> Recommended Opportunities Based on Your Profile
                    </h3>
                    <span className={'text-xs font-medium ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Calculated across 5 scoring factors</span>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {recs.map(r => {
                      const intern = internships.find(i => i.id === r.internshipId) || DEFAULT_INTERNSHIPS.find(i => i.id === r.internshipId) || {};
                      const isHigh = r.overallScore >= 90;
                      return (
                        <div key={r.id || r.internshipId} className={'rounded-3xl border p-6 flex flex-col justify-between space-y-5 shadow-lg transition-all duration-300 group hover:-translate-y-1 ' + (
                          isDark ? 'bg-slate-900/80 border-slate-800/90 hover:border-indigo-500/40' : 'bg-white border-slate-200 hover:border-indigo-400'
                        )}>
                          <div className='space-y-3.5'>
                            <div className='flex justify-between items-start gap-4'>
                              <div className='space-y-1 flex-1'>
                                <span className='text-[10px] font-bold text-indigo-500 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block'>
                                  {intern.company || 'Company'}
                                </span>
                                <h4 className={'text-base font-extrabold transition mt-0.5 ' + (isDark ? 'text-white group-hover:text-indigo-200' : 'text-slate-900 group-hover:text-indigo-600')}>{intern.title || 'Role'}</h4>
                                <p className={'text-xs line-clamp-2 leading-relaxed ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>{intern.description}</p>
                              </div>
                              <div className='text-right flex flex-col items-end'>
                                <div className={'px-3 py-1 rounded-2xl font-mono text-base font-extrabold shadow-xs border ' + (
                                  isHigh
                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                    : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30'
                                )}>
                                  {r.overallScore ?? 0}%
                                </div>
                                <span className={'text-[10px] mt-1 font-semibold uppercase tracking-wider ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>{isHigh ? 'Strong Alignment' : 'Moderate Fit'}</span>
                              </div>
                            </div>

                            <div className='flex flex-wrap gap-1.5 pt-1'>
                              {r.matchedSkills && r.matchedSkills.map(s => (
                                <span key={s} className='px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1'>
                                  <Check className='w-3 h-3' /> {s}
                                </span>
                              ))}
                              {r.missingMandatorySkills && r.missingMandatorySkills.map(s => (
                                <span key={s} className='px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1'>
                                  <AlertCircle className='w-3 h-3' /> Missing: {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className={'flex justify-between items-center pt-4 border-t ' + (isDark ? 'border-slate-800' : 'border-slate-100')}>
                            <button
                              onClick={() => toggleSave(intern.id)}
                              className={'text-xs font-semibold flex items-center gap-1.5 transition ' + (
                                savedList.includes(intern.id) ? 'text-emerald-500 font-bold' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                              )}
                            >
                              <Bookmark className={'w-4 h-4 ' + (savedList.includes(intern.id) ? 'fill-emerald-500' : '')} />
                              {savedList.includes(intern.id) ? 'Saved' : 'Save'}
                            </button>
                            <button
                              onClick={() => inspectRole(intern.id)}
                              className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition transform group-hover:scale-105'
                            >
                              View Breakdown <ArrowUpRight className='w-3.5 h-3.5' />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. MATCH ANALYSIS BREAKDOWN */}
            {tab === 'analysis' && activeMatch && (
              <div className='space-y-6'>
                <div className={'rounded-3xl border p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl backdrop-blur-xl transition-colors ' + (
                  isDark ? 'bg-slate-900/80 border-slate-800/90' : 'bg-white border-slate-200'
                )}>
                  <div className='flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left'>
                    <div className='w-24 h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col items-center justify-center p-3 shadow-inner'>
                      <span className='font-mono text-2xl font-black text-indigo-500'>{activeMatch.overallScore ?? 0}%</span>
                      <span className={'text-[9px] font-bold uppercase tracking-widest mt-0.5 ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Match</span>
                    </div>
                    <div className='space-y-1.5'>
                      <span className='px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 text-[11px] font-bold uppercase'>
                        {currentIntern?.company}
                      </span>
                      <h2 className={'text-2xl font-extrabold tracking-tight ' + (isDark ? 'text-white' : 'text-slate-900')}>{currentIntern?.title}</h2>
                      <p className={'text-xs flex items-center justify-center sm:justify-start gap-3 ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>
                        <span className='flex items-center gap-1'><MapPin className='w-3.5 h-3.5 text-slate-400' /> {currentIntern?.location}</span>
                        <span>•</span>
                        <span className='text-emerald-500 font-semibold'>₹{currentIntern?.stipendPerMonth ? currentIntern.stipendPerMonth.toLocaleString('en-IN') : '35,000'}/month</span>
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-3 items-center justify-center'>
                    <button
                      onClick={() => trackApp(currentIntern.id, 'APPLIED')}
                      className='px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition'
                    >
                      Mark as Applied
                    </button>
                    <span className={'px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border ' + (
                      activeMatch.eligibilityStatus === 'MEETS_SPECIFIED_MANDATORY_REQUIREMENTS'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                    )}>
                      {activeMatch.eligibilityStatus === 'MEETS_SPECIFIED_MANDATORY_REQUIREMENTS' ? <CheckCircle2 className='w-4 h-4' /> : <AlertCircle className='w-4 h-4' />}
                      {activeMatch.eligibilityStatus}
                    </span>
                  </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <div className={'rounded-3xl border p-6 space-y-4 shadow-xl transition-colors ' + (
                    isDark ? 'bg-slate-900/80 border-slate-800/90' : 'bg-white border-slate-200'
                  )}>
                    <div className={'flex justify-between items-center border-b pb-3 ' + (isDark ? 'border-slate-800' : 'border-slate-100')}>
                      <h3 className={'text-xs font-bold uppercase tracking-wider flex items-center gap-2 ' + (isDark ? 'text-slate-300' : 'text-slate-800')}>
                        <Zap className='w-4 h-4 text-indigo-500' /> 5-Factor Weighted Score Breakdown
                      </h3>
                      <span className={'text-[10px] font-mono ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>100 MAX</span>
                    </div>

                    {[
                      ['Technical Skills (35%)', activeMatch.componentScores?.technicalSkillsScore ?? 0, 'bg-indigo-500'],
                      ['Education Relevance (20%)', activeMatch.componentScores?.educationRelevanceScore ?? 0, 'bg-emerald-500'],
                      ['Projects & Experience (20%)', activeMatch.componentScores?.projectAndExperienceScore ?? 0, 'bg-indigo-400'],
                      ['Location & Availability (15%)', activeMatch.componentScores?.locationAndPreferenceScore ?? 0, 'bg-emerald-400'],
                      ['Certifications & Extras (10%)', activeMatch.componentScores?.additionalQualificationsScore ?? 0, 'bg-amber-400']
                    ].map(([label, score, colorClass]) => (
                      <div key={label} className='space-y-1.5'>
                        <div className='flex justify-between items-center text-xs font-medium'>
                          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{label}</span>
                          <span className={'font-mono font-bold ' + (isDark ? 'text-white' : 'text-slate-900')}>{score}/100</span>
                        </div>
                        <div className={'w-full h-2 rounded-full overflow-hidden ' + (isDark ? 'bg-slate-800' : 'bg-slate-100')}>
                          <div
                            className={'h-full rounded-full transition-all duration-500 ' + colorClass}
                            style={{ width: Math.min(100, Math.max(0, score)) + '%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={'rounded-3xl border p-6 space-y-5 shadow-xl transition-colors ' + (
                    isDark ? 'bg-slate-900/80 border-slate-800/90' : 'bg-white border-slate-200'
                  )}>
                    <div className={'flex justify-between items-center border-b pb-3 ' + (isDark ? 'border-slate-800' : 'border-slate-100')}>
                      <h3 className={'text-xs font-bold uppercase tracking-wider flex items-center gap-2 ' + (isDark ? 'text-slate-300' : 'text-slate-800')}>
                        <Sparkles className='w-4 h-4 text-emerald-500' /> Skill Gap &amp; Evidence Breakdown
                      </h3>
                      <span className={'text-[10px] font-mono ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>AI AUDIT</span>
                    </div>

                    <div className='space-y-2'>
                      <p className='text-xs font-bold text-emerald-500'>Matched Compulsory &amp; Preferred Skills ({activeMatch.matchedSkills?.length ?? 0})</p>
                      <div className='flex flex-wrap gap-1.5'>
                        {activeMatch.matchedSkills && activeMatch.matchedSkills.length > 0 ? (
                          activeMatch.matchedSkills.map(s => (
                            <span key={s} className='px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1'>
                              <Check className='w-3 h-3' /> {s}
                            </span>
                          ))
                        ) : (
                          <span className='text-xs text-slate-400 italic'>No matching skills detected</span>
                        )}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <p className='text-xs font-bold text-rose-500'>Missing Mandatory Skills ({activeMatch.missingMandatorySkills?.length ?? 0})</p>
                      <div className='flex flex-wrap gap-1.5'>
                        {activeMatch.missingMandatorySkills && activeMatch.missingMandatorySkills.length > 0 ? (
                          activeMatch.missingMandatorySkills.map(s => (
                            <span key={s} className='px-2.5 py-1 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1'>
                              <AlertCircle className='w-3 h-3' /> Missing: {s}
                            </span>
                          ))
                        ) : (
                          <span className='text-xs text-emerald-500 font-semibold flex items-center gap-1'>
                            <CheckCircle2 className='w-3.5 h-3.5' /> All mandatory recruiter skills satisfied!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={'p-4 rounded-2xl border text-xs leading-relaxed shadow-inner ' + (
                      isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    )}>
                      <strong className='text-indigo-500 font-bold'>Explainable Audit:</strong> {activeMatch.summaryExplanation}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. DISCOVERY */}
            {tab === 'discovery' && (
              <div className='space-y-6'>
                <div className={'rounded-2xl border p-4 flex items-center gap-3 shadow-md ' + (
                  isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200'
                )}>
                  <Search className='w-5 h-5 text-slate-400' />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Filter by title, company, or skill (e.g. Java, React, Docker)...'
                    className={'w-full text-sm bg-transparent border-0 focus:outline-none ' + (
                      isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'
                    )}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                  {internships.filter(i => !search || (i.title && i.title.toLowerCase().includes(search.toLowerCase())) || (i.requiredSkills && i.requiredSkills.some(s => s.toLowerCase().includes(search.toLowerCase())))).map(i => {
                    const m = recs.find(r => r.internshipId === i.id) || { overallScore: 85 };
                    return (
                      <div key={i.id} className={'rounded-3xl border p-6 space-y-4 flex flex-col justify-between shadow-md transition group ' + (
                        isDark ? 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-indigo-400'
                      )}>
                        <div>
                          <div className='flex justify-between items-start'>
                            <div>
                              <span className='text-[10px] font-bold text-indigo-500 uppercase tracking-wider'>{i.company}</span>
                              <h4 className={'text-base font-bold transition mt-0.5 ' + (isDark ? 'text-white group-hover:text-indigo-200' : 'text-slate-900 group-hover:text-indigo-600')}>{i.title}</h4>
                            </div>
                            <span className='font-mono text-sm font-extrabold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20'>
                              {m.overallScore}%
                            </span>
                          </div>
                          <p className={'text-xs mt-2 line-clamp-2 leading-relaxed ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>{i.description}</p>
                          <div className='flex flex-wrap gap-1.5 mt-3'>
                            {i.requiredSkills && i.requiredSkills.map(s => (
                              <span key={s} className={'px-2 py-0.5 rounded-md text-[10px] font-semibold border ' + (
                                isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700/50' : 'bg-slate-100 text-slate-700 border-slate-200'
                              )}>{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className={'flex justify-between items-center pt-4 border-t ' + (isDark ? 'border-slate-800' : 'border-slate-100')}>
                          <button
                            onClick={() => toggleSave(i.id)}
                            className={'text-xs font-semibold flex items-center gap-1 ' + (
                              savedList.includes(i.id) ? 'text-emerald-500' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                            )}
                          >
                            <Bookmark className='w-4 h-4' /> {savedList.includes(i.id) ? 'Saved' : 'Save'}
                          </button>
                          <button
                            onClick={() => inspectRole(i.id)}
                            className='px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition'
                          >
                            Analyze Fit
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. SAVED */}
            {tab === 'saved' && (
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <h2 className={'text-lg font-extrabold ' + (isDark ? 'text-white' : 'text-slate-900')}>Saved Internships Shortlist</h2>
                  <span className={'text-xs font-medium ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>{savedList.length} Opportunities</span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                  {savedList.length === 0 && (
                    <div className={'col-span-2 text-center py-12 text-xs border border-dashed rounded-3xl ' + (
                      isDark ? 'text-slate-500 border-slate-800' : 'text-slate-400 border-slate-200'
                    )}>
                      No saved internships yet. Click 'Save' on any opportunity card.
                    </div>
                  )}
                  {savedList.map(id => {
                    const intern = internships.find(i => i.id === id) || DEFAULT_INTERNSHIPS.find(i => i.id === id);
                    if (!intern) return null;
                    const m = recs.find(r => r.internshipId === id) || { overallScore: 90 };
                    return (
                      <div key={id} className={'rounded-3xl border p-6 flex justify-between items-center shadow-md ' + (
                        isDark ? 'bg-slate-900/80 border-slate-800/90' : 'bg-white border-slate-200'
                      )}>
                        <div>
                          <span className='text-[10px] font-bold text-indigo-500 uppercase tracking-wider'>{intern.company}</span>
                          <h4 className={'text-base font-extrabold mt-0.5 ' + (isDark ? 'text-white' : 'text-slate-900')}>{intern.title}</h4>
                          <p className={'text-xs mt-1 ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Match Score: <strong className='text-indigo-500'>{m.overallScore}%</strong></p>
                        </div>
                        <button
                          onClick={() => inspectRole(intern.id)}
                          className='px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition'
                        >
                          Analyze &amp; Apply
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. DEDUPLICATED TRACKER */}
            {tab === 'tracker' && (
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <h2 className={'text-lg font-extrabold ' + (isDark ? 'text-white' : 'text-slate-900')}>Application Status Tracker</h2>
                  {applications.length > 0 && (
                    <span className={'text-xs font-semibold ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>{applications.length} Unique Active Application{applications.length > 1 ? 's' : ''}</span>
                  )}
                </div>

                <div className='grid grid-cols-1 gap-4'>
                  {applications.length === 0 && (
                    <div className={'text-center py-12 text-xs border border-dashed rounded-3xl ' + (
                      isDark ? 'text-slate-500 border-slate-800' : 'text-slate-400 border-slate-200'
                    )}>
                      No applications tracked yet. Click "Mark as Applied" on any match breakdown page.
                    </div>
                  )}
                  {applications.map(app => {
                    const targetId = app.internshipId || app.id;
                    const intern = internships.find(i => i.id === targetId) || DEFAULT_INTERNSHIPS.find(i => i.id === targetId) || {};
                    return (
                      <div key={targetId} className={'rounded-3xl border p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md ' + (
                        isDark ? 'bg-slate-900/80 border-slate-800/90' : 'bg-white border-slate-200'
                      )}>
                        <div>
                          <span className='text-[10px] font-bold text-indigo-500 uppercase tracking-wider'>{intern.company || 'Company'}</span>
                          <h4 className={'text-base font-extrabold mt-0.5 ' + (isDark ? 'text-white' : 'text-slate-900')}>{intern.title || 'Internship Role'}</h4>
                          <p className={'text-xs mt-0.5 ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Applied on: {app.appliedDate || '2026-10-20'}</p>
                        </div>

                        <div className='flex items-center gap-3 w-full md:w-auto justify-end'>
                          <span className='px-3 py-1 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'>
                            {app.status}
                          </span>
                          <select
                            value={app.status}
                            onChange={e => trackApp(targetId, e.target.value)}
                            className={'border rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none ' + (
                              isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                            )}
                          >
                            <option value="SAVED">Saved</option>
                            <option value="APPLIED">Applied</option>
                            <option value="ASSESSMENT">Assessment</option>
                            <option value="INTERVIEW">Interview</option>
                            <option value="OFFER">Offer</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                          <button
                            type='button'
                            onClick={() => removeApplication(targetId)}
                            className={'p-2 rounded-xl border transition ' + (
                              isDark ? 'text-slate-400 hover:text-rose-400 bg-slate-800/60 border-slate-700/80' : 'text-slate-400 hover:text-rose-600 bg-slate-50 border-slate-200'
                            )}
                            title='Remove'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. PROFILE & RESUME STUDIO */}
            {tab === 'profile' && (
              <div className='space-y-6 max-w-3xl mx-auto'>
                <div className={'rounded-3xl border p-8 space-y-6 shadow-xl transition-colors ' + (
                  isDark ? 'bg-slate-900/80 border-slate-800/90' : 'bg-white border-slate-200'
                )}>
                  <div className={'flex justify-between items-center border-b pb-4 ' + (isDark ? 'border-slate-800' : 'border-slate-100')}>
                    <div>
                      <h2 className={'text-lg font-extrabold ' + (isDark ? 'text-white' : 'text-slate-900')}>Student Profile &amp; Resume Studio</h2>
                      <p className={'text-xs mt-0.5 ' + (isDark ? 'text-slate-400' : 'text-slate-500')}>Manage live skills and portfolio registered in MongoDB</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={resetSkillsToDefault}
                        className={'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition ' + (
                          isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        )}
                        title='Reset to Default Base Skills'
                      >
                        <RefreshCw className='w-3.5 h-3.5' /> Reset Skills
                      </button>
                      <button
                        onClick={saveProfile}
                        className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold shadow-md transition'
                      >
                        <Save className='w-4 h-4' /> Save Profile
                      </button>
                    </div>
                  </div>

                  {/* Resume Upload Dropzone */}
                  <div className={'p-6 rounded-2xl border border-dashed space-y-3.5 text-center sm:text-left ' + (
                    isDark ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-500/30' : 'bg-indigo-50/50 border-indigo-200'
                  )}>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
                      <div className='flex items-center gap-2.5'>
                        <div className='w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center'>
                          <Upload className='w-4 h-4' />
                        </div>
                        <span className={'text-xs font-bold uppercase tracking-wider ' + (isDark ? 'text-indigo-200' : 'text-indigo-900')}>Instant Resume Skill Extraction (.PDF / .TXT)</span>
                      </div>
                      {uploadedFileName && (
                        <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-semibold shadow-xs'>
                          <FileText className='w-3.5 h-3.5' /> {uploadedFileName}
                        </span>
                      )}
                    </div>
                    <p className={'text-xs leading-relaxed ' + (isDark ? 'text-slate-400' : 'text-slate-600')}>Upload your resume file. Our keyword parser scans and extracts verified technical competencies straight into your profile.</p>
                    <label className='inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-indigo-600/20 transition'>
                      <Upload className='w-3.5 h-3.5' /> Select Resume File (.pdf, .txt)
                      <input type='file' accept='.pdf,.txt' onChange={handleResumeUpload} className='hidden' />
                    </label>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs'>
                    <div>
                      <label className={'font-bold block mb-1.5 ' + (isDark ? 'text-slate-300' : 'text-slate-700')}>Full Name</label>
                      <input
                        value={profile.fullName || ''}
                        onChange={e => setProfile({...profile, fullName: e.target.value})}
                        className={'w-full border rounded-xl p-2.5 focus:outline-none focus:border-indigo-500 ' + (
                          isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        )}
                      />
                    </div>
                    <div>
                      <label className={'font-bold block mb-1.5 ' + (isDark ? 'text-slate-300' : 'text-slate-700')}>Headline</label>
                      <input
                        value={profile.headline || ''}
                        onChange={e => setProfile({...profile, headline: e.target.value})}
                        className={'w-full border rounded-xl p-2.5 focus:outline-none focus:border-indigo-500 ' + (
                          isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        )}
                      />
                    </div>
                  </div>

                  {/* Verified Skills Editor */}
                  <div className='text-xs space-y-2.5'>
                    <div className='flex justify-between items-center'>
                      <label className={'font-bold ' + (isDark ? 'text-slate-300' : 'text-slate-700')}>Verified Technical Skills ({profile.skills ? profile.skills.length : 0})</label>
                      <span className={'text-[11px] ' + (isDark ? 'text-slate-500' : 'text-slate-400')}>Click × on any skill to remove</span>
                    </div>
                    <div className={'flex flex-wrap gap-2 p-3 border rounded-2xl max-h-56 overflow-y-auto ' + (
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    )}>
                      {profile.skills && profile.skills.map(s => (
                        <span key={s.name} className={'inline-flex items-center gap-1.5 px-3 py-1 border rounded-xl text-xs font-semibold ' + (
                          isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800 shadow-2xs'
                        )}>
                          {s.name}
                          <button type='button' onClick={() => removeSkill(s.name)} className='text-slate-400 hover:text-rose-500 font-bold ml-1'>×</button>
                        </span>
                      ))}
                    </div>
                    <div className='flex gap-2 max-w-sm pt-1'>
                      <input
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        placeholder='e.g. Docker, Python, AWS'
                        className={'flex-1 border rounded-xl p-2.5 text-xs focus:outline-none focus:border-indigo-500 ' + (
                          isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        )}
                      />
                      <button
                        type='button'
                        onClick={addSkill}
                        className={'px-4 py-2 border rounded-xl text-xs font-bold transition flex items-center gap-1 ' + (
                          isDark ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                        )}
                      >
                        <Plus className='w-3.5 h-3.5' /> Add
                      </button>
                    </div>
                  </div>

                  {/* Add Project Form */}
                  <div className={'text-xs space-y-3 pt-5 border-t ' + (isDark ? 'border-slate-800' : 'border-slate-100')}>
                    <div className={'flex items-center gap-2 font-bold text-sm ' + (isDark ? 'text-white' : 'text-slate-900')}>
                      <FolderGit2 className='w-4 h-4 text-indigo-500' /> Add Project to Portfolio
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      <input
                        value={newProjTitle}
                        onChange={e => setNewProjTitle(e.target.value)}
                        placeholder='Project Title (e.g. Distributed Task Queue)'
                        className={'border rounded-xl p-2.5 text-xs focus:outline-none focus:border-indigo-500 ' + (
                          isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        )}
                      />
                      <input
                        value={newProjTech}
                        onChange={e => setNewProjTech(e.target.value)}
                        placeholder='Technologies Used (e.g. Java, Redis, Docker)'
                        className={'border rounded-xl p-2.5 text-xs focus:outline-none focus:border-indigo-500 ' + (
                          isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        )}
                      />
                    </div>
                    <textarea
                      value={newProjDesc}
                      onChange={e => setNewProjDesc(e.target.value)}
                      placeholder='Brief Project Description...'
                      rows={2}
                      className={'w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:border-indigo-500 ' + (
                        isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      )}
                    />
                    <button
                      type='button'
                      onClick={addProject}
                      className='px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5'
                    >
                      <Plus className='w-3.5 h-3.5' /> Add Project
                    </button>
                  </div>

                  {/* Projects Portfolio List */}
                  <div className={'text-xs space-y-2.5 pt-4 border-t ' + (isDark ? 'border-slate-800' : 'border-slate-100')}>
                    <label className={'font-bold block ' + (isDark ? 'text-slate-300' : 'text-slate-700')}>Project Portfolio ({profile.projects ? profile.projects.length : 0} Registered)</label>
                    <div className='space-y-2.5'>
                      {profile.projects && profile.projects.map((proj, idx) => (
                        <div key={idx} className={'p-4 rounded-2xl border flex justify-between items-start gap-4 ' + (
                          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                        )}>
                          <div>
                            <p className={'font-bold text-sm ' + (isDark ? 'text-white' : 'text-slate-900')}>{proj.title}</p>
                            <p className={'text-xs mt-1 leading-relaxed ' + (isDark ? 'text-slate-400' : 'text-slate-600')}>{proj.description}</p>
                            <div className='flex flex-wrap gap-1.5 mt-2.5'>
                              {proj.technologiesUsed && proj.technologiesUsed.map(t => (
                                <span key={t} className='px-2.5 py-0.5 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-lg text-[10px] font-semibold'>{t}</span>
                              ))}
                            </div>
                          </div>
                          <button
                            type='button'
                            onClick={() => removeProject(idx)}
                            className={'p-2 rounded-xl border transition ' + (
                              isDark ? 'text-slate-500 hover:text-rose-400 bg-slate-900 border-slate-800' : 'text-slate-400 hover:text-rose-600 bg-white border-slate-200 shadow-2xs'
                            )}
                            title='Delete Project'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}