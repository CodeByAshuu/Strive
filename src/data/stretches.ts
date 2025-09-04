// src/types/stretch.ts
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Stretch {
  name: string;
  difficulty: Difficulty;
  image?: string;
  primaryMuscles: string[];
  secondaryMuscles?: string[];
}

export interface MuscleStretches {
  [muscle: string]: Stretch[];
}

export const muscleStretches: MuscleStretches = {
  'Neck': [
    { 
      name: 'Seated Levator Scapulae Stretch', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/4e925307-6db5-4adb-8339-4d75d5afe674/seated+levator+scapulae+strain.jpg?format=2500w',
      primaryMuscles: ['Neck', 'Upper Trapezius'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'PNF Cervical Lateral Flexion', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/14399c40-df67-46ca-a0e3-e7a81452c526/PNF+Cervical+Lateral+Flexion.jpg?format=2500w',
      primaryMuscles: ['Neck', 'Deep Cervical Flexors'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'PNF Cervical Rotation', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/e60a6a08-4d92-4339-81ba-411ae9e56848/PNF+Cervical+Rotation.jpg?format=2500w',
      primaryMuscles: ['Neck', 'Levator Scapulae'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Head Drop', 
      difficulty: 'Advanced', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/21b52548-eb8f-4cc7-9646-9dc20bf07f8d/Head+Drop.jpg?format=2500w',
      primaryMuscles: ['Neck', 'Upper Trapezius'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Towel Cervical Distraction', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/1635543991870-LEVU4Q512MJNE41P664Q/Towel%2BCervical%2BDistraction.jpg?format=2500w',
      primaryMuscles: ['Neck', 'Upper Trapezius'],
      secondaryMuscles: ['Shoulders']
    }
  ],
  'Shoulders': [
    { 
      name: 'Banded Reverse Fly', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/shoulders/banded-reverse-fly.jpg',
      primaryMuscles: ['Shoulders', 'Rear Deltoids'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'Doorway Lean Back', 
      difficulty: 'Beginner', 
      image: '/images/stretches/shoulders/doorway-lean-back.jpg',
      primaryMuscles: ['Shoulders', 'Chest'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'Cable Face Pull', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/shoulders/cable-face-pull.jpg',
      primaryMuscles: ['Shoulders', 'Rear Deltoids'],
      secondaryMuscles: ['Upper Back', 'Rhomboids']
    },
    { 
      name: 'Quadruped Scapular Circles', 
      difficulty: 'Beginner', 
      image: '/images/stretches/shoulders/scapular-circles.jpg',
      primaryMuscles: ['Shoulders', 'Scapula'],
      secondaryMuscles: ['Upper Back']
    }
  ],
  'Shoulder Blade': [
    { 
      name: 'Doorway Shoulder Internal Rotation', 
      difficulty: 'Beginner', 
      image: '/images/stretches/shoulder-blade/doorway-internal-rotation.jpg',
      primaryMuscles: ['Shoulder Blade', 'Rotator Cuff'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Table Assisted Shoulder Extension', 
      difficulty: 'Beginner', 
      image: '/images/stretches/shoulder-blade/table-shoulder-extension.jpg',
      primaryMuscles: ['Shoulder Blade', 'Latissimus Dorsi'],
      secondaryMuscles: ['Back']
    },
    { 
      name: 'Prone W-Stretch', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/shoulder-blade/prone-w-stretch.jpg',
      primaryMuscles: ['Shoulder Blade', 'Rhomboids'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'Wall Crawl', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/shoulder-blade/wall-crawl.jpg',
      primaryMuscles: ['Shoulder Blade', 'Scapular Stabilizers'],
      secondaryMuscles: ['Shoulders', 'Upper Back']
    }
  ],
  'Chest': [
    { 
      name: 'Yoga Block Chest Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/chest/yoga-block-chest.jpg',
      primaryMuscles: ['Chest', 'Pectoralis Major'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Doorway Chest Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/chest/doorway-chest.jpg',
      primaryMuscles: ['Chest', 'Pectoralis'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Monster Band Shoulder Opener', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/chest/monster-band-opener.jpg',
      primaryMuscles: ['Chest', 'Shoulders'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'Swiss Ball Chest Stretch', 
      difficulty: 'Advanced', 
      image: '/images/stretches/chest/swiss-ball-chest.jpg',
      primaryMuscles: ['Chest', 'Pectoralis'],
      secondaryMuscles: ['Shoulders', 'Core']
    }
  ],
  'Elbow': [
    { 
      name: 'Wrist Flexor Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/elbow/wrist-flexor.jpg',
      primaryMuscles: ['Elbow', 'Forearm Flexors'],
      secondaryMuscles: ['Wrist']
    },
    { 
      name: 'Wrist Extensor Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/elbow/wrist-extensor.jpg',
      primaryMuscles: ['Elbow', 'Forearm Extensors'],
      secondaryMuscles: ['Wrist']
    }
  ],
  'Wrist': [
    { 
      name: 'Prayer Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/wrist/prayer-stretch.jpg',
      primaryMuscles: ['Wrist', 'Forearm'],
      secondaryMuscles: ['Hands']
    },
    { 
      name: 'Reverse Prayer Stretch', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/wrist/reverse-prayer.jpg',
      primaryMuscles: ['Wrist', 'Forearm'],
      secondaryMuscles: ['Hands']
    }
  ],
  'Core': [
    { 
      name: 'Cat-Cow Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/core/cat-cow.jpg',
      primaryMuscles: ['Core', 'Spine'],
      secondaryMuscles: ['Back']
    },
    { 
      name: 'Child\'s Pose', 
      difficulty: 'Beginner', 
      image: '/images/stretches/core/childs-pose.jpg',
      primaryMuscles: ['Core', 'Lower Back'],
      secondaryMuscles: ['Hips', 'Back']
    }
  ],
  'Back': [
    { 
      name: 'Dowel Lats Stretch', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/back/dowel-lats.jpg',
      primaryMuscles: ['Back', 'Latissimus Dorsi'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Banded Lats Stretch', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/back/banded-lats.jpg',
      primaryMuscles: ['Back', 'Latissimus Dorsi'],
      secondaryMuscles: ['Shoulders']
    }
  ],
  'Lower Back': [
    { 
      name: 'Knee-to-Chest Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/lower-back/knee-to-chest.jpg',
      primaryMuscles: ['Lower Back', 'Hips'],
      secondaryMuscles: ['Glutes']
    },
    { 
      name: 'Piriformis Stretch', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/lower-back/piriformis.jpg',
      primaryMuscles: ['Lower Back', 'Hips'],
      secondaryMuscles: ['Glutes']
    }
  ],
  'Spine': [
    { 
      name: 'Spinal Twist', 
      difficulty: 'Beginner', 
      image: '/images/stretches/spine/spinal-twist.jpg',
      primaryMuscles: ['Spine', 'Core'],
      secondaryMuscles: ['Back']
    },
    { 
      name: 'Seated Spinal Rotation', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/spine/seated-rotation.jpg',
      primaryMuscles: ['Spine', 'Core'],
      secondaryMuscles: ['Back']
    }
  ],
  'Posture': [
    { 
      name: 'Wall Angels', 
      difficulty: 'Beginner', 
      image: '/images/stretches/posture/wall-angels.jpg',
      primaryMuscles: ['Posture', 'Upper Back'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Thoracic Extension', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/posture/thoracic-extension.jpg',
      primaryMuscles: ['Posture', 'Upper Back'],
      secondaryMuscles: ['Spine']
    }
  ],
  'Hip': [
    { 
      name: 'Pigeon Pose', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/hip/pigeon-pose.jpg',
      primaryMuscles: ['Hip', 'Glutes'],
      secondaryMuscles: ['Lower Back']
    },
    { 
      name: 'Hip Flexor Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/hip/hip-flexor.jpg',
      primaryMuscles: ['Hip', 'Hip Flexors'],
      secondaryMuscles: ['Quadriceps']
    }
  ],
  'Hamstrings': [
    { 
      name: 'Standing Hamstring Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/hamstrings/standing-hamstring.jpg',
      primaryMuscles: ['Hamstrings'],
      secondaryMuscles: ['Glutes']
    },
    { 
      name: 'Seated Hamstring Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/hamstrings/seated-hamstring.jpg',
      primaryMuscles: ['Hamstrings'],
      secondaryMuscles: ['Lower Back']
    }
  ],
  'Quadriceps': [
    { 
      name: 'Standing Quad Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/quads/standing-quad.jpg',
      primaryMuscles: ['Quadriceps'],
      secondaryMuscles: ['Hips']
    },
    { 
      name: 'Couch Stretch', 
      difficulty: 'Intermediate', 
      image: '/images/stretches/quads/couch-stretch.jpg',
      primaryMuscles: ['Quadriceps', 'Hip Flexors'],
      secondaryMuscles: ['Hips']
    }
  ],
  'Calves': [
    { 
      name: 'Wall Calf Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/calves/wall-calf.jpg',
      primaryMuscles: ['Calves'],
      secondaryMuscles: ['Achilles']
    },
    { 
      name: 'Seated Calf Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/calves/seated-calf.jpg',
      primaryMuscles: ['Calves'],
      secondaryMuscles: ['Achilles']
    }
  ],
  'Ankle': [
    { 
      name: 'Ankle Circles', 
      difficulty: 'Beginner', 
      image: '/images/stretches/ankle/ankle-circles.jpg',
      primaryMuscles: ['Ankle'],
      secondaryMuscles: ['Calves']
    },
    { 
      name: 'Achilles Stretch', 
      difficulty: 'Beginner', 
      image: '/images/stretches/ankle/achilles.jpg',
      primaryMuscles: ['Ankle', 'Achilles'],
      secondaryMuscles: ['Calves']
    }
  ]
};