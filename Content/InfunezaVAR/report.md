# VAR-based Computational Analysis of Influenza and Weather Dynamics

**Authors:** Rohan Adla, Arrio Gonsalves, Shreyan Nalwad, Dylan Setiawan  
**Date:** December 13, 2025

## Summary

Multivariate time-series analysis of seasonal influenza dynamics using VAR modeling, Granger Causality testing, and Impulse Response Functions (IRFs). Tests whether country-level weather variables (temperature, humidity, wind speed, precipitation) statistically predict flu incidence beyond past flu values alone.

## Stack

- **Python** — data preprocessing, EDA, feature engineering
- **Go** — core VAR estimation (OLS), IRF computation, Granger causality tests, residual bootstrapping (efficiency-critical backend)
- **R / Shiny** — interactive frontend for forecasting and visualization

## Data

- **WHO influenza surveillance** — weekly Influenza A and B case counts
- **Country-level weather** — temperature, humidity, wind speed, precipitation
- **Country studied:** Qatar (proof-of-concept)
- Temporal alignment + stationarity testing (ADF) + seasonal differencing in preprocessing

## Methods

| Method | Purpose |
|---|---|
| VAR(p) — OLS estimation | Joint modeling of flu + weather as functions of their own lagged values |
| Impulse Response Functions (IRFs) | Quantify dynamic effect of a one-time weather shock on future flu incidence |
| Granger Causality (F-statistic) | Test if weather variables provide statistically significant predictive power for flu |
| Residual Bootstrap | Uncertainty quantification for IRFs and Granger statistics |

Final variable set: Influenza A/B counts, temperature, humidity, wind speed, precipitation (log-transformed variants tested).

## Key Results

**Forecasting:** VAR captures periodic seasonal structure for both Influenza A and B in Qatar. Predictions show smooth trends; A shows slight deviation from historical, likely because the forecast window coincides with end of flu season.

**IRF Analysis:** Wind speed and precipitation produced the largest and most sustained impulse responses for both Influenza A and B — indicating these are the model's most leveraged predictors.

**Granger Causality:**
- Influenza A: No variables showed Granger causality (p < 0.05) — weather alone insufficient to predict Flu A spread in Qatar
- Influenza B: **Wind speed Granger-causes Influenza B** (p < 0.05) — statistically significant directional relationship

**Bootstrap:** Asymptotic and bootstrap estimates aligned, validating model assumptions.

## Interpretation

The asymmetry between Flu A and Flu B in Granger causality is biologically interesting — Flu B tends to be more locally constrained in transmission (mostly children, less pandemic potential), making it potentially more sensitive to local weather conditions like wind-driven aerosol spread.

## Author Contributions

4-person team. Shreyan co-authored core technical framework and pipeline.
