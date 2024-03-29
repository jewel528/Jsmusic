import { SAMPLERATE } from "../environment";
import { cos, PI, sin } from "../math/sin";

// Taken from https://docs.rs/crate/biquad/0.2.0/source/src/

export const Q_BUTTERWORTH = 0.7071067811865475 as f32; // 1/Math.sqrt(2)

export enum FilterType {
    SinglePoleLowPass = 1 as i8,
    LowPass = 2 as i8,
    HighPass = 3 as i8,
    Notch = 4 as i8
}

export class Coefficients {
    // Denominator coefficients
    a1: f32;
    a2: f32;

    // Nominator coefficients
    b0: f32;
    b1: f32;
    b2: f32;

    phaseSamples: f32;
    magnitude: f32;

    calculatePhaseAndMagnitudeForFreq(freq: f32): void {
        const w: f32 = 2 * Mathf.PI * freq / SAMPLERATE;
      
        const cos1: f32 = Mathf.cos(-1 * w);
        const cos2: f32 = Mathf.cos(-2 * w);
      
        const sin1: f32 = Mathf.sin(-1 * w);
        const sin2: f32 = Mathf.sin(-2 * w);
      
        const realZeros: f32 = this.b0 + this.b1 * cos1 + this.b2 * cos2;
        const imagZeros: f32 = this.b1 * sin1 + this.b2 * sin2;
      
        const realPoles: f32 = 1 + this.a1 * cos1 + this.a2 * cos2;
        const imagPoles: f32 = this.a1 * sin1 + this.a2 * sin2;
      
        const divider: f32 = realPoles * realPoles + imagPoles * imagPoles;
      
        const realHw: f32 = (realZeros * realPoles + imagZeros * imagPoles) / divider;
        const imagHw: f32 = (imagZeros * realPoles - realZeros * imagPoles) / divider;
      
        this.magnitude = Mathf.sqrt(realHw * realHw + imagHw * imagHw);

        const phase: f32 = Mathf.atan2(imagHw, realHw);
      
        this.phaseSamples = -(phase / (2*Mathf.PI)) * (SAMPLERATE / freq);
    }
}

export class BiQuadFilter {
    y1: f32 = 0;
    y2: f32 = 0;
    x1: f32 = 0;
    x2: f32 = 0;
    s1: f32 = 0;
    s2: f32 = 0;
    readonly coeffs: Coefficients = new Coefficients();

    processForm2(input: f32): f32 {
        let out = this.s1 + this.coeffs.b0 * input;
        this.s1 = this.s2 + this.coeffs.b1 * input - this.coeffs.a1 * out;
        this.s2 = this.coeffs.b2 * input - this.coeffs.a2 * out;

        return out;
    }

    process(input: f32): f32 {
        let out = this.coeffs.b0 * input + this.coeffs.b1 * this.x1 + this.coeffs.b2 * this.x2
            - this.coeffs.a1 * this.y1
            - this.coeffs.a2 * this.y2;

        this.x2 = this.x1;
        this.x1 = input;
        this.y2 = this.y1;
        this.y1 = out;

        return out;
    }

    clearBuffers(): void {
        this.y1 = 0;
        this.y2 = 0;
        this.x1 = 0;
        this.x2 = 0;
        this.s1 = 0;
        this.s2 = 0;            
    }

    /// Creates coefficients based on the biquad filter type, sampling and cutoff frequency, and Q
    /// value. Note that the cutoff frequency must be smaller than half the sampling frequency and
    /// that Q may not be negative, this will result in an `Err()`.
    update_coeffecients(
        filtertype: FilterType,
        fsHertz: f32,
        f0Hertz: f32,
        q_value: f32
    ): void {
        const fLimit = (fsHertz / 2.0) - 1000;
        if (f0Hertz > fLimit) {
            f0Hertz = fLimit;
        }

        if (q_value < 0.0) {
            q_value = 0;
        }

        let omega: f32 = 2.0 * PI * f0Hertz / fsHertz;
        let alpha: f32;
        let omega_s: f32;
        let omega_c: f32;
        let b0: f32;
        let b1: f32;
        let b2: f32;
        let a0: f32;
        let a1: f32;
        let a2: f32;


        switch (filtertype) {
            case FilterType.SinglePoleLowPass:
                alpha = omega / (omega + 1.0);

                this.coeffs.a1 = alpha - 1.0;
                this.coeffs.a2 = 0.0;
                this.coeffs.b0 = alpha;
                this.coeffs.b1 = 0.0;
                this.coeffs.b2 = 0.0;

                break;
            case FilterType.LowPass:
                // The code for omega_s/c and alpha is currently duplicated due to the single pole
                // low pass filter not needing it and when creating coefficients are commonly
                // assumed to be of low computational complexity.
                omega_s = sin(omega);
                omega_c = cos(omega);
                alpha = omega_s / (2.0 * q_value);

                b0 = (1.0 - omega_c) * 0.5;
                b1 = 1.0 - omega_c;
                b2 = (1.0 - omega_c) * 0.5;
                a0 = 1.0 + alpha;
                a1 = -2.0 * omega_c;
                a2 = 1.0 - alpha;

                this.coeffs.a1 = a1 / a0;
                this.coeffs.a2 = a2 / a0;
                this.coeffs.b0 = b0 / a0;
                this.coeffs.b1 = b1 / a0;
                this.coeffs.b2 = b2 / a0;

                break;
            case FilterType.HighPass:
                omega_s = sin(omega);
                omega_c = cos(omega);
                alpha = omega_s / (2.0 * q_value);

                b0 = (1.0 + omega_c) * 0.5;
                b1 = -(1.0 + omega_c);
                b2 = (1.0 + omega_c) * 0.5;
                a0 = 1.0 + alpha;
                a1 = -2.0 * omega_c;
                a2 = 1.0 - alpha;

                this.coeffs.a1 = a1 / a0;
                this.coeffs.a2 = a2 / a0;
                this.coeffs.b0 = b0 / a0;
                this.coeffs.b1 = b1 / a0;
                this.coeffs.b2 = b2 / a0;

                break;
            case FilterType.Notch:
                omega_s = sin(omega);
                omega_c = cos(omega);
                alpha = omega_s / (2.0 * q_value);

                b0 = 1.0;
                b1 = -2.0 * omega_c;
                b2 = 1.0;
                a0 = 1.0 + alpha;
                a1 = -2.0 * omega_c;
                a2 = 1.0 - alpha;

                this.coeffs.a1 = a1 / a0;
                this.coeffs.a2 = a2 / a0;
                this.coeffs.b0 = b0 / a0;
                this.coeffs.b1 = b1 / a0;
                this.coeffs.b2 = b2 / a0;

                break;
        }
    }
}

export class LoPassBiQuadFilter extends BiQuadFilter {
    update(frequency: f32, Q: f32): void {
        this.update_coeffecients(FilterType.LowPass, SAMPLERATE, frequency , Q);
    }
}

export class HiPassBiQuadFilter extends BiQuadFilter {
    update(frequency: f32, Q: f32): void {
        this.update_coeffecients(FilterType.HighPass, SAMPLERATE, frequency , Q);
    }
}
