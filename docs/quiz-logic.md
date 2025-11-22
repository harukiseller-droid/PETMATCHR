# Breed Matching Logic Explanation

The system determines the best breed matches based on a scoring system that compares user answers from the "Lifestyle Match" quiz against pre-defined scores for each breed.

## Core Components

1.  **User Answers**: Collected from the quiz (e.g., "I live in an apartment", "I have kids").
2.  **Breed Scores (`LifestyleScore`)**: Each breed has scores (0-10) for various traits:
    -   `apartment_score`: Suitability for small spaces.
    -   `busy_worker_score`: Tolerance for being alone.
    -   `family_with_kids_score`: Safety and patience with children.
    -   `allergy_friendly_score`: Hypoallergenic qualities.
    -   `beginner_friendly_score`: Ease of training and forgiveness.
    -   `active_outdoor_score`: Energy and stamina.
3.  **Breed Traits**: Static data like `energy_level`, `shedding_level`, `cost_level`.

## The Matching Algorithm

The function `matchBreedsForPersona` in `src/lib/lifestyle-match.ts` performs the following steps:

### 1. Profile Inference
First, it infers a high-level "persona" based on key answers (e.g., "Apartment worker", "Active family"). This is primarily for the UI label and description, not the scoring itself.

### 2. Scoring Loop
The system iterates through *every* breed and calculates a `rawScore` based on how well the breed's scores align with the user's specific answers.

#### Scoring Rules:
*   **Home Type**:
    *   If `apartment`: Adds `apartment_score * 2`.
    *   If `house/yard`: Adds `active_outdoor_score` (assuming more space = more activity potential).
*   **Work Schedule**:
    *   If `busy/office`: Adds `busy_worker_score * 2`.
*   **Family Structure**:
    *   If `kids`: Adds `family_with_kids_score * 2`.
*   **Activity Level**:
    *   If `high`: Adds `active_outdoor_score * 2`.
    *   If `low`: Adds `(10 - active_outdoor_score)` (rewarding *lower* energy breeds).
*   **Shedding Preference**:
    *   If `low shedding`: Adds `allergy_friendly_score * 1.5`.
*   **Experience**:
    *   If `beginner`: Adds `beginner_friendly_score * 2`.
    *   If `experienced`: Adds `energy_level` (rewarding capability to handle intense dogs).
*   **Budget**:
    *   If `low budget`: Adds `(6 - cost_level) * 2` (rewarding low cost).
    *   If `high budget`: Adds `cost_level` (penalizing cost less or not at all).

### 3. Ranking and Normalization
1.  Breeds are sorted by `rawScore` descending.
2.  The top 3 breeds are selected.
3.  Scores are normalized to a 0-100 scale relative to the highest scoring breed in the set (or a theoretical max).

### 4. Explanation Generation
For each match, the system generates bullet points explaining *why* it matched, triggering specific text if certain criteria are met (e.g., "Strong track record with families..." if the user has kids and the breed scores high on kid-friendliness).
