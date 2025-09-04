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
      name: 'Cable Fly', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/04debb77-3167-4d2f-9e75-b69bba3a3b34/cable+fly.jpg?format=2500w',
      primaryMuscles: ['Chest', 'Pectoralis Major'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Decline Bench Press', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/3924b3fc-937a-4a35-8dd9-1068e45c9209/decline+bench+press.jpg?format=2500w',
      primaryMuscles: ['Chest', 'Pectoralis'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Incline Bench Press', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/571f3b3c-0dbf-4967-8b04-c786fcddc941/incline+bench+press.jpg?format=2500w',
      primaryMuscles: ['Chest', 'Shoulders'],
      secondaryMuscles: ['Upper Back']
    },
    { 
      name: 'Doorway Chest Stretch', 
      difficulty: 'Advanced', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/bf602891-d983-47a2-bab2-d2e1719b5ffd/Doorway+Chest+Stretch.jpg?format=2500w',
      primaryMuscles: ['Chest', 'Pectoralis'],
      secondaryMuscles: ['Shoulders', 'Core']
    },
    { 
      name: 'Deficit Push Up', 
      difficulty: 'Advanced', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/8940882e-e8ed-4269-93ec-a090eb430dae/deficit+push+up.jpg?format=2500w',
      primaryMuscles: ['Chest', 'Pectoralis'],
      secondaryMuscles: ['Shoulders', 'Core']
    },
    { 
      name: 'Floor Chest Stretch', 
      difficulty: 'Advanced', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/90031ff0-0b3a-4404-913d-629d40caaa52/Floor+Chest+Stretch.jpg?format=2500w',
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
      name: 'Pinch Grip Plate', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/0eac8018-1a06-40ba-9563-bcd34e9be241/pinch+grip+plate+supination.jpg?format=2500w',
      primaryMuscles: ['Wrist', 'Forearm'],
      secondaryMuscles: ['Hands']
    },
    { 
      name: 'Wrist Flexor Tendon Gliding', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/78352c14-d1ec-4e79-903e-ccf9a98005c2/wrist+flexor+tendon+gliding.jpg?format=2500w',
      primaryMuscles: ['Wrist', 'Forearm'],
      secondaryMuscles: ['Hands']
    },
    { 
      name: 'Straight Bar Ulnar Deviation', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/508a1145-3b74-4ddd-a92a-0c1659fafe24/straight+bar+ulnar+deviation.jpg?format=2500w',
      primaryMuscles: ['Wrist', 'Forearm'],
      secondaryMuscles: ['Hands']
    }
  ],
  'Core': [
    { 
      name: 'Scissor Kick', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/bf15d84e-28b9-4fd0-85dd-4a9889d5a18e/scissor+kick.jpg?format=2500w',
      primaryMuscles: ['Core', 'Spine'],
      secondaryMuscles: ['Back']
    },
    { 
      name: 'Side Plank Hip Dip', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/5112d607-62c4-435e-8315-43f4d102263d/side+plank+hip+dips.jpg?format=2500w',
      primaryMuscles: ['Core', 'Lower Back'],
      secondaryMuscles: ['Hips', 'Back']
    },
    { 
      name: 'Adductor Squeeze V-Up', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/9b7bd05a-bce5-4369-93fe-f9222ab39a20/adductor+squeeze+v+up.jpg?format=2500w',
      primaryMuscles: ['Core', 'Spine'],
      secondaryMuscles: ['Back']
    },
    { 
      name: 'Modified Eccentric Pallof Press', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/52a12402-f43f-44d8-8d90-4fbe10712889/modified+eccentric+pallof+press.jpg?format=2500w',
      primaryMuscles: ['Core', 'Lower Back'],
      secondaryMuscles: ['Hips', 'Back']
    },
    { 
      name: 'isometric Abdominal Crunch', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/e759bbfe-8c2f-4c3f-9d39-c76c6729a2bf/isometric+abdominal+crunch.jpg?format=2500w',
      primaryMuscles: ['Core', 'Spine'],
      secondaryMuscles: ['Back']
    },
    { 
      name: 'Alternate Heel Touches', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/682212f7-b181-453d-ac1f-46ed11a7a719/alternate+heel+touches.jpg?format=2500w',
      primaryMuscles: ['Core', 'Lower Back'],
      secondaryMuscles: ['Hips', 'Back']
    }
  ],
  'Upper Back': [
    { 
      name: 'Prisoner Extension', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/f66f1681-160d-48f4-a277-15c752e67420/prisoner+extension.jpg?format=2500w',
      primaryMuscles: ['Back', 'Latissimus Dorsi'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Banded Assited Thread the Needle', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/4ebedee4-184b-45ce-87ac-442df84388b3/Band+Assisted+Thread+the+Needle.jpg?format=2500w',
      primaryMuscles: ['Back', 'Latissimus Dorsi'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Cable Diverging Pulldown', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/dc76e253-e20e-4d8f-84b7-dc0bbccc18df/cable+diverging+pulldown.jpg?format=2500w',
      primaryMuscles: ['Back', 'Latissimus Dorsi'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Thoraic Open Book', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/1642443036922-WCY8RHW8LFE8V340GIQP/Thoracic%2BOpen%2BBook.jpg?format=2500w',
      primaryMuscles: ['Back', 'Latissimus Dorsi'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Floor Angel', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/1635539752212-3FVEVV7VVGLNCTKUVF2Y/Floor%2BAngel.jpg?format=2500w',
      primaryMuscles: ['Back', 'Latissimus Dorsi'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Regressed Thoracic Extension', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/9b057c0a-85f0-49a1-9b73-5a64a7fa48e4/Regressed+Thoracic+Extension.jpg?format=2500w',
      primaryMuscles: ['Back', 'Latissimus Dorsi'],
      secondaryMuscles: ['Shoulders']
    }
  ],
  'Lower Back': [
    { 
      name: 'Elevated Child\'s Pose Side Stretch', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/daf8744b-ca19-4ffc-8923-9d7672bb715a/elevated+childs+pose+side+stretch.jpg?format=2500w',
      primaryMuscles: ['Lower Back', 'Hips'],
      secondaryMuscles: ['Glutes']
    },
    { 
      name: 'Ankle Sciatic Nerve Flossing', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/548b5571-1b5e-4992-a2a8-de699218f1a8/ankle+sciatic+nerve+flossing.jpg?format=2500w',
      primaryMuscles: ['Lower Back', 'Hips'],
      secondaryMuscles: ['Glutes']
    },
    { 
      name: 'Prisoner Side Crunch', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/0e9789c9-a8d8-4d9d-b081-36c22d63b5e3/prisoner+side+crunch.jpg?format=2500w',
      primaryMuscles: ['Lower Back', 'Hips'],
      secondaryMuscles: ['Glutes']
    },
    { 
      name: 'Prisoner Extension', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/f66f1681-160d-48f4-a277-15c752e67420/prisoner+extension.jpg?format=2500w',
      primaryMuscles: ['Lower Back', 'Hips'],
      secondaryMuscles: ['Glutes']
    },
    { 
      name: 'Lumbar Rotation Stretch', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/87a7d3a2-c2a4-49fd-bff6-59e2de7e1550/lumbar+rotation+stretch.jpg?format=2500w',
      primaryMuscles: ['Lower Back', 'Hips'],
      secondaryMuscles: ['Glutes']
    },
    { 
      name: 'Prone Extension with Dowel', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/221879ba-2a22-4d6d-845b-02a8c827a191/Prone+Extension+with+Dowel.jpg?format=2500w',
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
      name: 'Foam Roller Single Leg Bridge', 
      difficulty: 'Beginner', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/4ab7c748-4dfd-4263-9c04-623a57daebd2/Foam+Roller+Single+Leg+Bridge.jpg?format=2500w',
      primaryMuscles: ['Posture', 'Upper Back'],
      secondaryMuscles: ['Shoulders']
    },
    { 
      name: 'Swiss Ball Straight Leg Bridge', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/d41ddd55-1de0-404d-9c33-cd6f7a3fdb49/Swiss+Ball+Straight+Leg+Bridge.jpg?format=2500w',
      primaryMuscles: ['Posture', 'Upper Back'],
      secondaryMuscles: ['Spine']
    },
    { 
      name: 'Kettle Bell Romanian Deadlift', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/1632679994213-42OVRN1T9AL4XVBZEMKC/Kettlebell%2BRomanian%2BDeadlift.jpg?format=2500w',
      primaryMuscles: ['Posture', 'Upper Back'],
      secondaryMuscles: ['Spine']
    },
    { 
      name: 'Kettle Bell Single Leg Deadlift', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/1632679070200-GPF74NS0IRMA0U9Z1UM8/Kettlebell%2BSingle%2BLeg%2BDeadlift.jpg?format=2500w',
      primaryMuscles: ['Posture', 'Upper Back'],
      secondaryMuscles: ['Spine']
    },
    { 
      name: 'Active Hamstring Stretch', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/6f41b3a7-d683-4482-aafd-788e132ad3bd/Active+Hamstring+Stretch.jpg?format=2500w',
      primaryMuscles: ['Posture', 'Upper Back'],
      secondaryMuscles: ['Spine']
    },
    { 
      name: 'Glute Bridge March', 
      difficulty: 'Intermediate', 
      image: 'https://images.squarespace-cdn.com/content/v1/5f5e8592d2b0854b18af6975/1642367054619-37KJJOAANYZ9MRYKQGWN/Glute%2BBridge%2BMarch.jpg?format=2500w',
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