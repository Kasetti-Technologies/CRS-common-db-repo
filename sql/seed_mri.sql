BEGIN;

WITH
center AS (
  INSERT INTO "Center"(id, name, slug, active)
  VALUES (gen_random_uuid(), 'Alpha Diagnostic Center', 'alpha-diagnostic', true)
  RETURNING id
),
modality AS (
  INSERT INTO "Modality"(id, name, "slotDuration")
  VALUES (gen_random_uuid(), 'MRI', 30)
  RETURNING id
),
center_modality AS (
  INSERT INTO "CenterModality"(id, "centerId", "modalityId")
  SELECT gen_random_uuid(), center.id, modality.id
  FROM center, modality
),
machines AS (
  INSERT INTO "Machine"(id, "centerId", "modalityId")
  SELECT gen_random_uuid(), center.id, modality.id
  FROM center, modality
  UNION ALL
  SELECT gen_random_uuid(), center.id, modality.id
  FROM center, modality
),
operators AS (
  INSERT INTO "Operator"(id, "centerId", "modalityId", active)
  SELECT gen_random_uuid(), center.id, modality.id, true
  FROM center, modality
  UNION ALL
  SELECT gen_random_uuid(), center.id, modality.id, true
  FROM center, modality
)
INSERT INTO "AvailabilityRule"
(id, "centerId", "modalityId", "dayOfWeek", "startTime", "endTime", active)
SELECT
  gen_random_uuid(),
  center.id,
  modality.id,
  d.day,
  '09:00',
  '17:00',
  true
FROM center, modality,
     (VALUES (1),(2),(3),(4),(5)) AS d(day);

COMMIT;

/*
Alpha → MRI

Beta → CT

Beta → X-Ray

Gamma → Ultrasound
*/

-- psql "postgresql://postgres:pgpassword@localhost:5436/crs-commn-db"   -f sql/seed_mri.sql