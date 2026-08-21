import React from 'react';

export default function NumerosityProfileCard({ skills, unlockedLevels, onClose }) {
  const skillList = [
    {
      name: 'Quantity Comparison',
      key: 'quantityComparison',
      desc: 'Perceptual magnitude discrimination without counting',
      color: 'bg-emerald-400',
    },
    {
      name: 'Shape & Spacing Invariance',
      key: 'shapeInvariance',
      desc: 'Understanding that density/spacing does not alter count',
      color: 'bg-amber-400',
    },
    {
      name: 'Distractor Resistance',
      key: 'distractorResistance',
      desc: 'Filtering irrelevant visual clutter (inhibitory control)',
      color: 'bg-rose-400',
    },
    {
      name: 'Symbolic Mapping',
      key: 'symbolMapping',
      desc: 'Direct linking of dot quantities with Arabic numerals',
      color: 'bg-sky-400',
    },
    {
      name: 'Spatial Number Line',
      key: 'spatialNumberLine',
      desc: 'Mental linear spatial representation of numbers',
      color: 'bg-purple-400',
    },
    {
      name: 'Arithmetic Composition',
      key: 'arithmetic',
      desc: 'Additive & subtractive cluster transformations',
      color: 'bg-orange-400',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-lg">
            📊
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Learner Numerosity Cognitive Profile
            </h3>
            <p className="text-xs text-slate-400">
              Diagnostic tracking across 6 core number sense dimensions.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400">
          {unlockedLevels.length} / 12 Levels Unlocked
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillList.map((skill) => {
          const val = skills[skill.key] || 50;
          return (
            <div
              key={skill.key}
              className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2.5 shadow-inner"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{skill.name}</span>
                <span className="font-mono font-black text-indigo-400">{val}%</span>
              </div>

              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${val}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-tight">
                {skill.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-xs text-indigo-200 flex items-center space-x-3">
        <span className="text-xl">💡</span>
        <div>
          <span className="font-bold text-indigo-300 block">Pedagogical Summary:</span>
          Regular multi-sensory numerosity exercises enhance the brain's intraparietal sulcus (IPS), improving spontaneous attention to number without anxiety.
        </div>
      </div>
    </div>
  );
}
