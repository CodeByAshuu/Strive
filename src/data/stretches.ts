// src/data/muscleStretches.ts
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface StretchItem {
  name: string
  duration: string
  difficulty: Difficulty
  image?: string // path under public/, e.g. "/assets/stretches/standing-forward-fold.jpg"
}

const muscleStretches: Record<string, StretchItem[]> = {
  Neck: [
    { name: 'Neck Tilt', duration: '20-30s', difficulty: 'Beginner', image: '/assets/stretches/neck-tilt.jpg' },
    { name: 'Neck Rotation', duration: '20-30s', difficulty: 'Beginner', image: '/assets/stretches/neck-rotation.jpg' }
  ],
//   Shoulders: [
//     { name: 'Cross-Body Stretch', duration: '30s each arm', difficulty: 'Beginner', image: '/assets/stretches/cross-body.jpg' },
//     { name: 'Overhead Tricep Stretch', duration: '30s each arm', difficulty: 'Beginner', image: '/assets/stretches/overhead-tricep.jpg' }
//   ],
//   'Shoulder Blade': [
//     { name: 'Scapular Retraction', duration: '30-45s', difficulty: 'Beginner', image: '/assets/stretches/scapular-retraction.jpg' }
//   ],
//   Chest: [
//     { name: 'Doorway Chest Stretch', duration: '30-60s', difficulty: 'Beginner', image: '/assets/stretches/doorway-chest.jpg' }
//   ],
//   Back: [
//     { name: "Child's Pose", duration: '60-120s', difficulty: 'Beginner', image: '/assets/stretches/child-pose.jpg' },
//     { name: 'Cat-Cow', duration: '60s', difficulty: 'Beginner', image: '/assets/stretches/cat-cow.jpg' }
//   ],
//   Hamstrings: [
//     { name: 'Standing Forward Fold', duration: '30-60s', difficulty: 'Beginner', image: '/assets/stretches/standing-forward-fold.jpg' },
//     { name: 'Seated Hamstring Stretch', duration: '30s each leg', difficulty: 'Beginner', image: '/assets/stretches/seated-hamstring.jpg' }
//   ],
//   Quadriceps: [
//     { name: 'Standing Quad Stretch', duration: '30s each leg', difficulty: 'Beginner', image: '/assets/stretches/standing-quad.jpg' },
//     { name: 'Couch Stretch', duration: '60-90s each leg', difficulty: 'Intermediate', image: '/assets/stretches/couch-stretch.jpg' }
//   ],
//   Calves: [
//     { name: 'Wall Calf Stretch', duration: '30s each leg', difficulty: 'Beginner', image: '/assets/stretches/wall-calf.jpg' },
//   ],
  // ... add remaining muscles the same way
}

export default muscleStretches
