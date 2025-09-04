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
      name: 'Cervical Crunch', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/93dc0ca9-540b-4601-ad4a-e113392af167/cervical+crunch.jpg?format=2500w',
      primaryMuscles: ['Neck', 'Deep Cervical Flexors'],
      secondaryMuscles: ['Upper Back']
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
      name: 'Lat Pulldown Slider', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/8870a1d2-5df4-455a-9c2d-c563a139bd84/lat+pulldown+slider.jpg?format=2500w',
      primaryMuscles: ['Shoulders', 'Rear Deltoids'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'Irradiated Shoulder Extension', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/a1535a03-6f58-43fe-936c-3f70d004f357/irradiated+shoulder+extension.jpg?format=2500w',
      primaryMuscles: ['Shoulders', 'Chest'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'Elevated Child\'s Pose Side Stretch', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/daf8744b-ca19-4ffc-8923-9d7672bb715a/elevated+childs+pose+side+stretch.jpg?format=2500w',
      primaryMuscles: ['Shoulders', 'Rear Deltoids'],
      secondaryMuscles: ['Upper Back', 'Rhomboids']
    },
    { 
      name: 'Banded Reverse Fly', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/7c00ef60-96ef-472c-b14b-f2ad1dce5d65/banded+reverse+fly.jpg?format=2500w',
      primaryMuscles: ['Shoulders', 'Scapula'],
      secondaryMuscles: ['Upper Back']
    }
  ],
  'Shoulder Blade': [
    { 
      name: 'Banded Shoulder Fly', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/7c00ef60-96ef-472c-b14b-f2ad1dce5d65/banded+reverse+fly.jpg?format=2500w',
      primaryMuscles: ['Shoulder Blade', 'Rotator Cuff'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Seated Rhomboid Stretch', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/6451fb8c-45fc-411c-91b7-6af07a4d5ce4/seated+rhomboid+stretch.jpg?format=2500w',
      primaryMuscles: ['Shoulder Blade', 'Latissimus Dorsi'],
      secondaryMuscles: ['Back']
    },
    { 
      name: 'Doorway Lean Back', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/65597834-0c42-4238-8d39-50eb96f3113b/doorway+lean+back.jpg?format=2500w',
      primaryMuscles: ['Shoulder Blade', 'Rhomboids'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'Cross Body Reverse Fly', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/1f40ad85-2e55-4ac1-bfd4-98714729f431/cross+body+reverse+fly.jpg?format=2500w',
      primaryMuscles: ['Shoulder Blade', 'Scapular Stabilizers'],
      secondaryMuscles: ['Shoulders', 'Upper Back']
    },
    { 
      name: 'Incline Bench Lateral Raise', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/144aab22-55b9-46a4-9aa8-e8992794593d/incline+bench+lateral+raise.jpg?format=2500w',
      primaryMuscles: ['Shoulder Blade', 'Scapular Stabilizers'],
      secondaryMuscles: ['Shoulders', 'Upper Back']
    },
    { 
      name: 'Scapula Flutters', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/144aab22-55b9-46a4-9aa8-e8992794593d/incline+bench+lateral+raise.jpg?format=2500w',
      primaryMuscles: ['Shoulder Blade', 'Scapular Stabilizers'],
      secondaryMuscles: ['Shoulders', 'Upper Back']
    },
    { 
      name: 'Prone Pinwheel', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/96fe5ef4-7397-439e-aeea-34522b04fd7f/prone+pinwheel.jpg?format=2500w',
      primaryMuscles: ['Shoulder Blade', 'Scapular Stabilizers'],
      secondaryMuscles: ['Shoulders', 'Upper Back']
    },
    { 
      name: 'Quadruped Scapular Circles', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/1c0b7d25-24c3-4bf5-aac6-24a7f57d3af5/quadruped+scapular+circles.jpg?format=2500w',
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
      name: 'Hang Grip Curl', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/3f346a50-ab21-46e7-8ce6-97c83aa037e1/hang+grip+curl.jpg?format=2500w',
      primaryMuscles: ['Elbow', 'Forearm Flexors'],
      secondaryMuscles: ['Wrist']
    },
    { 
      name: 'Anti-Pronation Reverse Curl', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/f6d025d0-65ec-4b07-a87a-3737b70334d4/anti-pronation+reverse+curl.jpg?format=2500w',
      primaryMuscles: ['Elbow', 'Forearm Extensors'],
      secondaryMuscles: ['Wrist']
    },
    { 
      name: 'Anti-Pronation Straight Bar Curl', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/4f969239-2522-49dc-b208-54eee537cb74/anti-pronation+straight+bar+curl.jpg?format=2500w',
      primaryMuscles: ['Elbow', 'Forearm Extensors'],
      secondaryMuscles: ['Wrist']
    },
    { 
      name: 'Elbow CAR', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/ae80dd7b-6ad9-4520-97f0-9d177c20fb0a/elbow+car.jpg?format=2500w',
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