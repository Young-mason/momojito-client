import * as d3 from "d3";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Pageutils from "../components/Pageutils";
import data from "../public/cocktailcircle.json";

const width = 938;
const height = 938;
const color = d3
  .scaleLinear()
  .domain([0, 5])
  .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
  .interpolate(d3.interpolateHcl);
const pack = (data) =>
  d3.pack().size([width, height]).padding(5)(
    d3
      .hierarchy(data)
      .sum((d) => 100)
      .sort((a, b) => b.value - a.value)
  );

const root = pack(data);

const SVG = styled.svg`
  display: block;
  margin: 0;
  width: 100%;
  height: 100%;
  background: ${color(0)};
  cursor: "pointer";
`;

export default function CirclePacking() {
  const router = useRouter();
  const svgRef = useRef();
  useEffect(() => {
    let focus = root;
    let view;
    const svg = d3.select(svgRef.current);
    svg.on("click", (event) => zoom(event, root));
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", (d) => (d.children ? color(d.depth) : "white"))
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "#000");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null);
      })
      .on("click", (event, d) => {
        if (focus !== d) {
          if (d.data.value) {
            setTimeout(() => router.push(`/cocktails/${d.data.value}`), 1000);
          }
          zoom(event, d);
        }
        event.stopPropagation();
      });

    const label = svg
      .append("g")
      .style("font", "50px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
      .style("display", (d) => (d.parent === root ? "inline" : "none"))
      .text((d) => d.data.name);

    const image = svg
      .append("g")
      .selectAll("image")
      .data(root.descendants())
      .join("image")
      .attr("x", -40)
      .attr("y", -40)
      .attr("height", 75)
      .attr("width", 75)
      .attr("xlink:href", (d) =>
        d.data.value ? `/cocktails/${d.data.value}.png` : ""
      );

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
      const k = width / v[2];

      view = v;
      image.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      label.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      node.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      node.attr("r", (d) => d.r * k);
    }
    function zoom(event, d) {
      const focus0 = focus;

      focus = d;

      const transition = svg
        .transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", (d) => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return (t) => zoomTo(i(t));
        });

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline";
        })
        .transition(transition)
        .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none";
        });
    }
  }, []);

  return (
    <Pageutils>
      <SVG
        ref={svgRef}
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      ></SVG>
    </Pageutils>
  );
}