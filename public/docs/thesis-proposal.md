# Master's Thesis Proposal: Zero Knowledge Systems for Field Programmable Gate Arrays

**Author:** Raham A. Butt  
**Advisor:** Dr. Xiang Fu

---

## Abstract

With the growing adoption of zero knowledge virtual machines (zkVMs) like Nexus 3.0 and increasing demand for efficient cryptographic operations in blockchain, privacy-preserving computation, and verifiable computing applications, there is a critical need for hardware acceleration solutions that can bridge the performance gap between theoretical capabilities and practical deployment.

This research proposes a comparative performance analysis of three distinct hardware acceleration platforms for Zero Knowledge Proof (ZKP) systems:
- AWS F1 instances (first-generation FPGA)
- AWS F2 instances (second-generation FPGA)
- CUDA-based GPU acceleration

By systematically benchmarking Montgomery multiplication and Multi-Scalar Multiplication (MSM) operations across these platforms, this work aims to provide empirical insights into the trade-offs between latency, throughput, power efficiency, and cost-effectiveness for ZKP acceleration.

---

## Motivation

Zero knowledge proof systems have become essential building blocks for modern cryptographic applications, but the computational complexity of ZKP generation remains a significant barrier to widespread adoption. Nexus zkVM 3.0 has demonstrated remarkable performance improvements through algorithmic innovations, achieving nearly 1000x speedup, which underscores the potential for optimization through both software and hardware acceleration.

### Key Motivating Factors

**Large Integer Arithmetic Bottleneck:** ZKP operations involve extensive large integer computations with RSA operations using integers larger than 2048 bits and elliptic curves using 254-256 bit integers (BN254 curve). These operations are fundamentally mismatched with general-purpose CPUs optimized for 64-bit word sizes, creating a computational bottleneck that dominates proof generation time. The schoolbook multiplication algorithm exhibits O(n²) complexity when chunking large integers, making hardware acceleration particularly attractive.

**Diverse Hardware Acceleration Platforms:** The landscape of hardware acceleration has diversified significantly with AWS offering both F1 (legacy, end-of-life December 2025) and F2 instances (8 AMD Virtex UltraScale+ FPGAs per instance), alongside mature CUDA-based GPU acceleration frameworks like Ingonyama's ICICLE library. Each platform offers distinct architectural advantages:
- FPGAs provide ultra-low latency through custom pipeline design and deterministic timing
- GPUs excel at massive parallel throughput for batch operations

**Existing Implementation Gap:** While theoretical analysis suggests performance advantages for both FPGA and GPU approaches, there exists a gap in systematic empirical comparison across platforms using identical cryptographic operations. Prior work has evaluated individual platforms in isolation, but comprehensive head-to-head benchmarking with modern hardware and consistent workloads is lacking.

---

## Phase 1: Fundamental Cryptographic Operations

The first phase focuses on implementing fundamental cryptographic operations, specifically Montgomery modular multiplication for the BN254 elliptic curve, across all three platforms.

### CUDA/GPU Implementation

We have developed the **bn254_cuda** project featuring optimized field operations with 16-bit arithmetic batching for throughput optimization. Initial benchmarking on RTX 4080 GPU demonstrates:
- Throughput: 14 million operations per second (Mops/s) for batch sizes of 1M operations
- Single-operation latency: approximately 71.94 ms

The implementation leverages CUDA streams for overlapped computation and data transfer, achieving high GPU utilization through coarse-grained batching strategies.

### FPGA Implementation

We are developing SystemVerilog modules targeting both F1 and F2 instances. The FPGA design implements:
- Montgomery multiplication algorithm with pipelined 64-bit word processing
- DSP48/DSP58 blocks for partial products
- Rust-based host code for PCIe communication and Montgomery parameter computation

The F2 platform offers significant advantages:
- 2.8M system logic cells per FPGA
- 9,024 DSP slices
- 460 GB/s HBM memory bandwidth per FPGA
- Multi-FPGA parallelization strategies

### Platform Selection Analysis Criteria

1. Single-operation latency for real-time applications
2. Batch throughput for proof generation workloads
3. Memory bandwidth utilization efficiency
4. Power consumption per operation
5. Cost per operation on AWS infrastructure

---

## Phase 2: Zero-Knowledge Proof System Integration

Building upon fundamental operation implementations, the second phase integrates these accelerators into complete zero-knowledge proof systems to evaluate end-to-end performance.

### Multi-Scalar Multiplication (MSM)

The critical bottleneck in modern ZKP systems is Multi-Scalar Multiplication (MSM), which typically consumes 70-90% of proof generation time. MSM computes:

**Σ(aᵢ × Pᵢ)** where aᵢ are 254-bit scalars and Pᵢ are elliptic curve points on BN254.

For a typical proof with 1 million constraints, MSM involves 1 million independent scalar multiplications followed by point accumulation—an embarrassingly parallel workload ideal for comparative platform analysis.

We will implement MSM acceleration for either **Groth16** or **NOVA** depending on which demonstrates better compatibility with our platform implementations.

### GPU Implementation Strategy

- Coarse-grained batching where base elliptic curve points are uploaded once and permanently cached in GPU memory
- For each proof, only the million scalars are transferred to the GPU
- Resulting single point (64 bytes) returned to host—a 500,000:1 upload-to-download ratio that amortizes PCIe overhead
- CUDA streams enable pipelined processing where data transfer overlaps with computation

### FPGA Implementation Strategy

- Low latency streaming pipelines with deterministic sub-microsecond latency per operation
- Multi-FPGA task decomposition where MSM workloads are partitioned across 8 FPGAs
- Inter-FPGA communication for final point accumulation
- Potential linear speedup for sufficiently large problem sizes

### End-to-End Performance Metrics

1. Proof generation time for varying circuit sizes (10K to 10M constraints)
2. Throughput measured in proofs per second for batch scenarios
3. Latency from witness input to proof output
4. Memory footprint and bandwidth utilization
5. Energy consumption per proof (critical for sustainability analysis)
6. Total cost of ownership including AWS instance pricing

---

## Phase 3: Analysis and Optimization

The final phase synthesizes empirical findings into comprehensive platform selection guidelines and explores optimization techniques unique to each architecture.

### Decision Framework

We will develop a decision framework mapping application requirements (latency sensitivity, throughput demands, cost constraints, power budgets) to optimal platform choices:
- Real-time blockchain verification → FPGA's deterministic low latency
- zkVM proof serving for cloud applications → GPU's high-throughput batch processing

### FPGA-Specific Optimizations

Advanced integer arithmetic algorithms:
- **Karatsuba multiplication:** O(n^1.585) complexity
- **Toom-Cook multiplication:** O(n^1.465) complexity

These offer significant advantages over schoolbook multiplication's O(n²) for 254-bit field operations in BN254 and map naturally to FPGA's hierarchical structure.

### Cross-Platform Insights

Evaluation of hybrid architectures combining CPU, GPU, and FPGA for different pipeline stages:
- Witness generation (CPU)
- MSM acceleration (GPU)
- Final proof assembly (CPU)

The F1 vs. F2 comparison will provide insights into FPGA generation improvements, particularly regarding multi-FPGA scaling efficiency and the impact of HBM vs. DDR4 memory on ZKP workloads.

---

## Expected Outcomes

1. **Platform selection guidelines** mapping ZKP application requirements to optimal hardware choices
2. **Quantitative performance models** predicting speedup as a function of problem size and batch characteristics
3. **Architecture-specific optimization techniques** achieving near-theoretical performance bounds
4. **Open-source implementations** (bn254_cuda) enabling reproducible research and practical deployment

---

## Conclusion

This research provides the first comprehensive comparative analysis of hardware acceleration platforms for zero knowledge proof systems using modern infrastructure and identical cryptographic workloads. Through systematic benchmarking of Montgomery multiplication and MSM operations across FPGA (F1/F2) and GPU (CUDA) platforms, we deliver empirical performance characterization including latency, throughput, power efficiency, and cost metrics.

This work advances the practical viability of zero knowledge technologies in production environments by providing the empirical foundation for informed hardware acceleration decisions, ultimately accelerating adoption in blockchain, privacy-preserving computation, and post-quantum cryptographic applications.

---

## References

1. "Mitigating Ponzi schemes by zero-knowledge auditing" - https://doi.org/10.1080/19393555.2024.2404216
2. "Nexus zkVM 3.0 Architecture" - https://docs.nexus.xyz/zkvm/architecture
3. "Amazon AWS EC2 F2 Instance types" - https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html
4. "FPGA based crypto acceleration" - https://dl.acm.org/doi/10.1145/3569457
5. "Groth16 Explained" - https://www.rareskills.io/post/groth16
6. "Nova: Recursive Zero-Knowledge Arguments from Folding Schemes" - https://eprint.iacr.org/2021/370
7. "if-ZKP: Intel FPGA-Based Acceleration of Zero Knowledge Proofs" - https://www.computer.org/csdl/proceedings-article/fccm/2024/724300a212/1ZWbp6XcENO
8. "Ingonyama ICICLE CUDA library" - https://dev.ingonyama.com/
9. "AWS EC2 F1 Instance Documentation" - https://aws.amazon.com/ec2/instance-types/f1/
10. "bn254_cuda" - https://github.com/raham24/bn254_cuda
11. "bn254_cuda_rust" - https://github.com/raham24/bn254_cuda_rust
